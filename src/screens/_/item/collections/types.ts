/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:22:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 12:10:23
 */
import type { EventType, Id, SubjectId, SubjectTypeCn, WithNavigation } from '@types'

export type Props = WithNavigation<{
  index?: number
  inViewY?: number
  id?: SubjectId
  name?: string
  nameCn?: string
  tip?: string
  rank?: string | number
  score?: string | number
  total?: string | number
  simpleStars?: boolean
  tags?: string
  comments?: string
  time?: string
  collection?: string
  userCollection?: string
  cover?: string
  type?: SubjectTypeCn
  numberOfLines?: number
  modify?: string
  showLabel?: boolean
  hideScore?: boolean
  relatedId?: Id
  isCollect?: boolean
  isCatalog?: boolean
  isEditable?: boolean
  event?: EventType
  filter?: string
  showManage?: boolean

  /** 是否显示创建贴贴的按钮 */
  showLikesCreate?: boolean
  touchPosition?: 'outer' | 'inner'

  /** 评论是否使用占满布局 */
  commentsFull?: boolean

  /** 评论默认显示行数 */
  commentsLines?: number

  active?: boolean
  onEdit?: (modify?: string) => any
}>
