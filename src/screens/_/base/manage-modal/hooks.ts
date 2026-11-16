/*
 * @Author: czy0729
 * @Date: 2026-11-16 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 12:00:00
 *
 * 收藏管理弹窗交互: 状态载体与流程 (打开拉取 / 提交翻面 / 关闭触发章节自动完成);
 * 表单控件交互见 handlers.ts, 打开填充 / 提交流程 / 章节自动完成见 utils.ts
 */
import { useEffect, useRef, useState } from 'react'
import { BackHandler } from 'react-native'
import { collectionStore, systemStore, userStore } from '@stores'
import { getStorage, getTimestamp, info } from '@utils'
import { logger } from '@utils/dev'
import { H, IOS, MODEL_PRIVATE } from '@constants'
import { createManageModalHandlers } from './handlers'
import { autoCompleteEps, getTypeByAction, openCollection, submitCollection } from './utils'
import { COMPONENT, NAMESPACE_COMMENT, NAMESPACE_PRIVACY } from './ds'

import type { InputInstance } from '@components'
import type { Private } from '@types'
import type { State, UseManageModalArgs } from './types'

export function useManageModal({
  visible,
  subjectId,
  status: statusProp = '',
  action,
  onSubmit,
  onClose,
  onAutoCompleteEps,
  flipOnSubmit = false
}: UseManageModalArgs) {
  const [state, setState] = useState<State>({
    focus: false,
    loading: true,
    fetching: false,
    rating: 0,
    tags: '',
    showTags: true,
    showUserTags: false,
    comment: '',
    commentHistory: [],
    commentChanged: false,
    status: '',
    privacy: MODEL_PRIVATE.getValue<Private>('公开'),
    submitting: false,
    flipLabel: '',
    flipKey: 0
  })

  /** 局部 setState, 语义与 class 版一致 */
  const updateState = (patch: Partial<State> | ((prev: State) => Partial<State>)) =>
    setState(prev => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }))

  /** 评论输入框引用 */
  const commentRef = useRef<InputInstance>(null)

  /** 用于判断收藏请求是否已经发出并返回数据 */
  const fetchedRef = useRef(false)

  /** 用于判断本次弹窗是否提交成功 (关闭后触发章节自动完成) */
  const submittedRef = useRef(false)

  /** 提交进行中弹窗被用户主动关闭 (结果未知, 失败时不再提示重试) */
  const closedRef = useRef(false)

  /** 上一次 visible, 用于识别打开 / 关闭转移 */
  const prevVisibleRef = useRef(false)

  /** 转移效果的异步逻辑读取最新 state 用 */
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  })

  /** 由 action 与条目类型推导 SubjectType */
  const type = getTypeByAction(action, subjectId)

  /** 表单控件交互 (评分 / 标签 / 评论输入 / 私密开关) */
  const handlers = createManageModalHandlers({ subjectId, stateRef, commentRef, updateState })
  const { setCommentHistory } = handlers

  /** 由小时级缓存决定是否拉取用户标签 */
  const fetchUserTags = async () => {
    // 每种类型一小时最多刷新一次
    const { _loaded } = userStore.tags(type)
    if (getTimestamp() - Number(_loaded || 0) <= H) return

    return userStore.fetchTags(subjectId, type)
  }

  const handleSubmit = async () => {
    const { rating, tags, comment, status, privacy } = state
    if (!fetchedRef.current && !status) {
      info('收藏数据仍在获取中，请稍等')
      return
    }

    setCommentHistory(comment)
    updateState({
      submitting: true
    })

    // 会话代际: 打开弹窗会递增 flipKey, 等待期内被关闭重开即视为放弃上一会话
    const flipKeyAtSubmit = stateRef.current.flipKey

    await submitCollection({
      values: { subjectId, rating, tags, status, privacy, comment },
      action,
      onSubmit,
      onClose,
      flipOnSubmit,
      flipKeyAtSubmit,
      submittedRef,
      closedRef,
      stateRef,
      updateState
    })
  }

  const handleClose = () => {
    // 如果用户输入过评论，无论如何先保存草稿
    const { commentChanged, comment: lastComment } = stateRef.current
    if (commentChanged && lastComment) setCommentHistory(lastComment)

    // 提交进行中被用户主动关闭 (返回键 / 遮罩 / ✕) 时回滚成功标记并标记放弃,
    // 避免关闭分支误触发章节自动完成, 以及失败提示在弹窗已关时弹出「请重试」
    submittedRef.current = false
    closedRef.current = true

    updateState({
      commentChanged: false
    })
    onClose?.()
  }

  /** 关闭回调需要被转移效果与安卓返回键读到最新版本, 以 ref 中转 */
  const handleCloseRef = useRef<(() => void) | undefined>(undefined)
  useEffect(() => {
    handleCloseRef.current = handleClose
  })

  /** 挂载: 读回评论历史与私密设置, 预填已有收藏状态 */
  useEffect(() => {
    ;(async () => {
      try {
        updateState({
          showTags: systemStore.setting.showTags === true,
          commentHistory: (await getStorage<string[]>(NAMESPACE_COMMENT)) || [],
          privacy:
            (await getStorage<Private>(NAMESPACE_PRIVACY)) ||
            MODEL_PRIVATE.getValue<Private>('公开')
        })

        // 弹窗打开前条目收藏数据可能已就绪, 直接预填状态
        const data = collectionStore.collection(subjectId)
        if (data?._loaded && data?.status?.type) {
          updateState({
            status: data.status.type
          })
        }
      } catch (error) {
        logger.error(COMPONENT, 'componentDidMount', error)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 挂载仅执行一次; subjectId 变化即弹窗更换宿主, 由打开转移分支处理
  }, [])

  /** 安卓返回键关闭 (仅弹窗可见时订阅) */
  useEffect(() => {
    if (IOS || !visible) return

    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      handleCloseRef.current?.()
      return true
    })
    return () => subscription.remove()
  }, [visible])

  /** 打开时复位并拉取最新收藏信息; 提交成功后的关闭触发章节自动完成 */
  useEffect(() => {
    const prevVisible = prevVisibleRef.current
    prevVisibleRef.current = visible

    if (visible && !prevVisible) {
      // 每次打开都复位提交标记与翻面状态 (重挂载提交按钮还原为「更新」)
      // submitting / closedRef 不在此复位: 在途提交保持按钮锁定, 其翻面与关窗由 flipKey 代际守卫跳过
      submittedRef.current = false
      updateState(prev => ({
        loading: false,
        focus: false,
        status: statusProp,
        flipLabel: '',
        flipKey: prev.flipKey + 1
      }))

      openCollection({
        subjectId,
        statusProp,
        fetchedRef,
        handleCloseRef,
        updateState,
        fetchUserTags
      })
    } else if (!visible && prevVisible && submittedRef.current) {
      // 提交成功后弹窗关闭, 此刻再触发章节自动完成, 保持关闭后不久执行的原有节奏
      submittedRef.current = false

      if (
        (systemStore.setting.autoCompleteEps && (type === 'anime' || type === 'real')) ||
        (systemStore.setting.autoCompleteBooks && type === 'book')
      ) {
        setTimeout(() => {
          autoCompleteEps(subjectId, type, onAutoCompleteEps)
        }, 320)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅在开合转移时执行, 语义有意对齐旧 UNSAFE_componentWillReceiveProps
  }, [visible])

  return {
    /** 表单与提交状态 (评分 / 标签 / 评论 / 状态 / 私密 / 提交中 / 翻面) */
    ...state,

    /** 由 action 与条目类型推导的条目类型 */
    type,

    /** 表单控件交互 */
    ...handlers,

    /** 提交收藏 */
    handleSubmit,

    /** 关闭弹窗 */
    handleClose
  }
}
