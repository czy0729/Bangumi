/*
 * @Author: czy0729
 * @Date: 2026-11-16 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 12:00:00
 *
 * 收藏管理弹窗表单控件交互: 评分 / 标签 / 评论输入 / 私密开关, 均为纯状态更新
 */
import { subjectStore } from '@stores'
import { feedback, HTMLDecode, setStorage, sleep } from '@utils'
import { MODEL_PRIVATE } from '@constants'
import { MAX_HISTORY_COUNT, NAMESPACE_COMMENT, NAMESPACE_PRIVACY } from './ds'

import type { InputInstance } from '@components'
import type { CollectionStatus, Private, PrivateCn, RatingStatus, SubjectId } from '@types'
import type { State } from './types'

type Args = {
  subjectId: SubjectId
  stateRef: { current: State }
  commentRef: { current: InputInstance }
  updateState: (patch: Partial<State> | ((prev: State) => Partial<State>)) => void
}

export function createManageModalHandlers({ subjectId, stateRef, commentRef, updateState }: Args) {
  const setCommentHistory = (value: string) => {
    if (!value) return

    let commentHistory = [...stateRef.current.commentHistory]
    if (commentHistory.includes(value)) {
      commentHistory = commentHistory.filter(item => item !== value)
      commentHistory.unshift(value)
    } else {
      commentHistory.unshift(value)
    }

    if (commentHistory.length > MAX_HISTORY_COUNT) {
      commentHistory = commentHistory.filter((_item, index) => index < MAX_HISTORY_COUNT)
    }

    updateState({
      commentHistory
    })
    setStorage(NAMESPACE_COMMENT, commentHistory)
  }

  const handleChangeRating = (value: number) => {
    updateState({
      rating: value
    })
    feedback(true)
  }

  const handleChangeTags = (text: string) => {
    updateState({
      tags: text
    })
  }

  const handleChangeStatus = (status: RatingStatus | CollectionStatus) => {
    updateState({
      status
    })
  }

  const handleToggleTag = (name: string) => {
    const { tags } = stateRef.current
    const selected = tags.split(' ')
    const index = selected.indexOf(name)
    if (index === -1) {
      selected.push(name)
    } else {
      selected.splice(index, 1)
    }

    updateState({
      tags: selected.join(' ')
    })
    feedback(true)
  }

  const handleTogglePrivacy = () => {
    const { privacy } = stateRef.current
    const label = MODEL_PRIVATE.getLabel<PrivateCn>(privacy)
    const value = MODEL_PRIVATE.getValue<Private>(label === '公开' ? '私密' : '公开')
    updateState({
      privacy: value
    })
    feedback(true)
    setStorage(NAMESPACE_PRIVACY, value)
  }

  const handleFetchTags = async () => {
    updateState({
      fetching: true,
      showTags: true
    })

    await subjectStore.fetchSubjectFromHTML(subjectId)
    updateState({
      fetching: false
    })
  }

  const handleFocus = () => {
    updateState({
      focus: true
    })
  }

  const handleBlur = () => {
    updateState({
      focus: false
    })

    // 安卓中收起键盘并不会把聚焦取消, 主动取消以使跨端表现一致
    try {
      if (typeof commentRef.current?.inputRef?.blur === 'function') {
        commentRef.current.inputRef.blur()
      }
    } catch {}
  }

  const handleSubmitEditing = () => {
    try {
      if (typeof commentRef.current?.inputRef?.focus === 'function') {
        commentRef.current.inputRef.focus()
      }
    } catch {}
  }

  const handleForwardRef = (ref: InputInstance | null) => {
    commentRef.current = ref
  }

  const handleCommentChange = (text: string) => {
    updateState({
      comment: HTMLDecode(text),
      commentChanged: true
    })
  }

  const handleShowHistory = () => {
    handleBlur()
    return sleep(240)
  }

  const handleToggleTagsRecent = () => {
    updateState({
      showUserTags: false
    })
  }

  const handleToggleTagsUser = () => {
    updateState({
      showUserTags: true
    })
  }

  return {
    /** 评论输入框引用 */
    commentRef,

    /** 记录评论历史并持久化 */
    setCommentHistory,

    /** 评分变化 */
    handleChangeRating,

    /** 标签输入变化 */
    handleChangeTags,

    /** 收藏状态切换 */
    handleChangeStatus,

    /** 选择或取消单个标签 */
    handleToggleTag,

    /** 切换公开与私密 */
    handleTogglePrivacy,

    /** 展开并拉取标签 */
    handleFetchTags,

    /** 输入框聚焦 */
    handleFocus,

    /** 输入框失焦 */
    handleBlur,

    /** 标签输入回车后聚焦评论框 */
    handleSubmitEditing,

    /** 接收评论输入框实例 */
    handleForwardRef,

    /** 评论输入变化 */
    handleCommentChange,

    /** 失焦后展示评论历史 */
    handleShowHistory,

    /** 切到常用标签 */
    handleToggleTagsRecent,

    /** 切到我的标签 */
    handleToggleTagsUser
  }
}
