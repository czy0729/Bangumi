/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:22:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 17:18:23
 */
import { EventType, Navigation, RatingStatus, SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  navigation?: Navigation
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
  isDo?: boolean
  isOnHold?: boolean
  isDropped?: boolean
  isCollect?: boolean
  isCatalog?: boolean
  isEditable?: boolean
  event?: EventType
  filter?: string
  showManage?: boolean
  onEdit?: (modify?: string) => any
}
