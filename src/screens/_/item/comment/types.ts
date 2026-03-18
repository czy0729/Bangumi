/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:57:00
 */
import type { CollectionStatusCn, EventType, Fn, SubjectId, UserId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  time?: string
  avatar?: string
  userId?: UserId
  userName?: string
  star?: string | number
  status?: CollectionStatusCn
  comment?: string
  subjectId?: SubjectId
  relatedId?: string | number
  action?: string
  mainId?: string
  mainName?: string
  event?: EventType
  popoverData?: string[] | readonly string[]

  /** 是否特别关注 */
  like?: boolean
  onSelect?: Fn
}>
