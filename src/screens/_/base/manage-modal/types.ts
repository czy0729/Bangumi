/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:39:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-16 06:37:39
 */
import type { CollectionStatus, Private, RatingStatus, SubjectActions, SubjectId } from '@types'

export type Props = {
  visible?: boolean
  disabled?: boolean
  subjectId?: SubjectId
  title?: string
  desc?: string
  action?: SubjectActions

  /** 收藏状态 (不传时以打开后服务器返回为准) */
  status?: RatingStatus | CollectionStatus | ''
  onSubmit?: (item: {
    subjectId: SubjectId
    rating: number
    tags: string
    status: RatingStatus | CollectionStatus | ''
    privacy: Private
    comment: string
  }) => boolean | void | Promise<boolean | void>
  onClose?: () => void
  onAutoCompleteEps?: () => void

  /** 提交成功后提交按钮是否做翻面反馈 (更新 → 最新真实收藏状态 + 震动), 仅进度页入口传入 */
  flipOnSubmit?: boolean
}

export type UseManageModalArgs = Pick<
  Props,
  | 'visible'
  | 'subjectId'
  | 'status'
  | 'action'
  | 'onSubmit'
  | 'onClose'
  | 'onAutoCompleteEps'
  | 'flipOnSubmit'
>

export type State = Partial<{
  focus: boolean
  loading: boolean
  fetching: boolean
  rating: number
  tags: string
  showTags: boolean
  showUserTags: boolean
  comment: string
  commentHistory: string[]

  /** 输入框是否主动变动过 */
  commentChanged: boolean
  status: '' | RatingStatus | CollectionStatus
  privacy: Private

  /** 是否提交请求中 (提交按钮转圈变灰) */
  submitting: boolean

  /** 提交成功后提交按钮翻面到的文案 (空为不翻面) */
  flipLabel: string

  /** 弹窗再次打开时递增, 重挂载提交按钮以复位翻面动画 */
  flipKey: number
}>
