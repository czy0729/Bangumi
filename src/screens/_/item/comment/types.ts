/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 20:32:51
 */
import type { CollectionStatusCn, EventType, SubjectId, UserId, WithViewStyles } from '@types'

/** 评论长按菜单选中回调
 * - title: 菜单项标题
 * - userData: 当前用户资料
 * - comment: 评论内容
 * - relatedId: 关联条目 ID
 */
export type ItemCommentOnSelect = (
  title: string,
  userData: {
    avatar: string
    userId: UserId
    userName: string
  },
  comment: string,
  relatedId: string | number
) => void

/** 条目评论组件属性 */
export type Props = WithViewStyles<{
  /** 时间 */
  time?: string

  /** 头像 */
  avatar?: string

  /** 用户 ID */
  userId?: UserId

  /** 用户名 */
  userName?: string

  /** 评分 */
  star?: string | number

  /** 收藏状态 */
  status?: CollectionStatusCn

  /** 评论内容 */
  comment?: string

  /** 条目 ID */
  subjectId?: SubjectId

  /** 关联条目 ID */
  relatedId?: string | number

  /** 动作类型 */
  action?: string

  /** 主条目 ID */
  mainId?: string

  /** 主条目名称 */
  mainName?: string

  /** 跳转事件 */
  event?: EventType

  /** 长按菜单数据 */
  popoverData?: string[] | readonly string[]

  /** 是否追踪 */
  like?: boolean

  /** 评论长按菜单选中回调 */
  onSelect?: ItemCommentOnSelect
}>
