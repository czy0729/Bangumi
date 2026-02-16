/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 11:55:47
 */
import { CollectionStatusCn, EventType, Fn, Navigation, SubjectId, UserId, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
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
}
