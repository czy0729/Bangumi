/*
 * @Author: czy0729
 * @Date: 2026-11-16 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 12:00:00
 *
 * 收藏管理弹窗工具函数: 类型推导 / 打开填充 / 提交流程 / 章节自动完成
 */
import { collectionStore, subjectStore, userStore } from '@stores'
import { alert, confirm, HTMLDecode, info, navigationReference, sleep } from '@utils'
import { getBucketId } from '@utils/bucket'
import { logger } from '@utils/dev'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'

import type { SubjectActions, SubjectId, SubjectType } from '@types'
import type { State, UseManageModalArgs } from './types'

/** 由 action 与条目类型推导 SubjectType (区别于 @utils 的标签 → 颜色 getType) */
export function getTypeByAction(action: SubjectActions, subjectId: SubjectId): SubjectType {
  if (action === '听') return 'music'
  if (action === '玩') return 'game'
  if (action === '读') return 'book'
  return MODEL_SUBJECT_TYPE.getLabel<SubjectType>(subjectStore.type(subjectId))
}

/** 打开弹窗: 拉取最新收藏信息填充表单, 处理授权失效与本地缓存清理 */
export async function openCollection({
  subjectId,
  statusProp,
  fetchedRef,
  handleCloseRef,
  updateState,
  fetchUserTags
}: {
  subjectId: UseManageModalArgs['subjectId']
  statusProp: UseManageModalArgs['status']
  fetchedRef: { current: boolean }
  handleCloseRef: { current: (() => void) | undefined }
  updateState: (patch: Partial<State> | ((prev: State) => Partial<State>)) => void
  fetchUserTags: () => Promise<unknown> | undefined
}) {
  try {
    const result = await collectionStore.fetchCollection(subjectId)
    fetchedRef.current = true
    logger.log(COMPONENT, 'openCollection', JSON.stringify(result))

    // 弱网/异常路径可能返回空, 直接结束, 避免下方解构报错
    if (!result) return

    if (result?.error && result?.error?.includes?.('token')) {
      // 提前告知授权信息失效
      const navigation = navigationReference()
      const content = `获取收藏信息失败：${result.error}，授权信息可能过期了`
      if (navigation) {
        confirm(
          content,
          () => {
            handleCloseRef.current?.()

            setTimeout(() => {
              navigation.push('LoginV2')
            }, 400)
          },
          '警告',
          undefined,
          `去${i18n.login()}`
        )
      } else {
        alert(content)
      }
    } else if (result?.code === 400 && result?.error?.includes?.('Nothing found')) {
      // 通常在客户端里面收藏过的条目，在网页端删除收藏了，没被追踪到需要主动清理本地缓存
      collectionStore.removeCollection(subjectId)
      collectionStore.removeStatus(subjectId)
      userStore.removeCollection(subjectId)
    }

    const {
      rating,
      tag = [],
      comment,
      private: privacy,
      status: newStatus = { type: undefined }
    } = result

    // 若传递有收藏状态, 而请求后实际又没有, 主动清理全局缓存收藏状态
    if (!Object.keys(newStatus).length && statusProp) {
      collectionStore.removeStatus(subjectId)
    }

    updateState(prev => {
      const patch: Partial<State> = {
        rating,
        tags: tag.join(' '),
        comment
      }

      // 若用户在请求期间没有手动选择状态, 以服务器返回为准
      if (prev.status === '') patch.status = newStatus.type as State['status']
      // API 返回数值 0 | 1, 状态使用字符串 '0' | '1'
      if (privacy !== undefined) patch.privacy = String(privacy) as State['privacy']

      return patch
    })

    fetchUserTags()
  } catch (error) {
    // 存量加固: fetchCollection 网络异常会 throw, 避免弹窗停留在空表单且无日志
    logger.error(COMPONENT, 'openCollection', error)
  }
}

/**
 * 提交收藏流程: 失败提示不关窗; 成功后按入口翻面并播完关窗
 *
 * @param flipKeyAtSubmit 提交时的弹窗代际, 打开弹窗会递增, 等待期内被关闭重开即视为放弃上一会话
 */
export async function submitCollection({
  values,
  action,
  onSubmit,
  onClose,
  flipOnSubmit,
  flipKeyAtSubmit,
  submittedRef,
  closedRef,
  stateRef,
  updateState
}: {
  values: {
    subjectId: UseManageModalArgs['subjectId']
    rating: number
    tags: string
    status: UseManageModalArgs['status']
    privacy: State['privacy']
    comment: string
  }
  action: SubjectActions
  onSubmit: UseManageModalArgs['onSubmit']
  onClose: UseManageModalArgs['onClose']
  flipOnSubmit: boolean
  flipKeyAtSubmit: number
  submittedRef: { current: boolean }
  closedRef: { current: boolean }
  stateRef: { current: State }
  updateState: (patch: Partial<State> | ((prev: State) => Partial<State>)) => void
}) {
  const { subjectId } = values

  // 预置成功标记: 关闭分支需要在弹窗关闭前看到它, 失败时再回滚
  submittedRef.current = true
  closedRef.current = false

  try {
    const result = await onSubmit({
      ...values,
      comment: HTMLDecode(values.comment || '')
    })

    // 会话代际守卫: 等待期间弹窗被关闭重开 (flipKey 递增) 即视为放弃上一会话, 后续翻面 / 提示 / 关窗一并跳过
    if (stateRef.current.flipKey !== flipKeyAtSubmit) return

    // 失败: 统一在此提示, 不关弹窗, 可直接重试; 提交中已被用户主动放弃的只记日志 (弹窗已关, 无处重试)
    if (result === false) {
      submittedRef.current = false
      if (!closedRef.current) info('更新失败, 请重试')
      return
    }

    // 成功: 需要翻面反馈的入口, 取最新真实收藏状态后提交按钮翻面 (更新 → 真实状态) + 震动;
    // 等待期内被用户主动关闭的放弃翻面 (数据同步由入口自行完成)
    if (flipOnSubmit && !closedRef.current) {
      const latest = await collectionStore.fetchCollection(subjectId)
      const realStatus = latest?.status?.type
        ? MODEL_COLLECTION_STATUS.getLabel(latest.status.type)
        : ''
      updateState({
        flipLabel: realStatus ? realStatus.replace('看', action) : '已更新'
      })
      // 翻面 (240ms 延迟 + 480ms 动画) 播完后停留约 1s, 让用户看清状态颜色
      await sleep(1820)

      // 会话代际守卫: 停留期内被关闭重开, 不关闭新会话的弹窗
      if (stateRef.current.flipKey !== flipKeyAtSubmit) return
    }

    // 翻面入口播完再关弹窗, 其余入口立即关
    if (!closedRef.current) onClose?.()
  } catch (error) {
    // 入口实现异常的兜底: 复位标记避免残留导致关闭弹窗时误触发章节自动完成
    submittedRef.current = false
    logger.error(COMPONENT, 'handleSubmit', error)
    if (!closedRef.current) info('更新失败, 请重试')
  } finally {
    updateState({
      submitting: false
    })
  }
}

/** 看、读过时自动完成所有进度、话数、卷数 */
export async function autoCompleteEps(
  subjectId: SubjectId,
  type: SubjectType,
  onAutoCompleteEps?: () => void
) {
  const result = await collectionStore.fetchCollection(subjectId)
  if (result?.status?.type !== 'collect') return

  // 通常在条目页中
  if (onAutoCompleteEps && typeof onAutoCompleteEps === 'function') {
    onAutoCompleteEps()
    return
  }

  // 通常在列表项中
  const last = getBucketId(subjectId)
  const STATE_KEY = `subjectFormHTML${last}` as const
  await subjectStore.init(STATE_KEY)

  const updateEps = (data: { subjectId: SubjectId; watchedEps?: number; watchedVols?: number }) => {
    if (data.watchedEps || data.watchedVols) {
      logger.log(COMPONENT, 'doAutoCompleteEps', data)
      collectionStore.doUpdateSubjectEp({ ...data, noConsole: true })
    }
  }

  if (type === 'anime' || type === 'real') {
    const totalEps =
      Number(subjectStore.subjectFormHTML(subjectId)?.totalEps) ||
      Number((await subjectStore.fetchSubjectFromHTML(subjectId))?.totalEps)
    updateEps({ subjectId, watchedEps: totalEps || undefined })
  } else if (type === 'book') {
    const book = (await subjectStore.fetchSubjectFromHTML(subjectId))?.book
    updateEps({
      subjectId,
      watchedEps: Number(book?.totalChap) || undefined,
      watchedVols: Number(book?.totalVol) || undefined
    })
  }
}
