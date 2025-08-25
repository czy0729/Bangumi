/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:22:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-24 10:50:25
 */
import { EventType, Id, Navigation, SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  navigation?: Navigation
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
  touchPosition?: 'outer' | 'inner'
  onEdit?: (modify?: string) => any
}
