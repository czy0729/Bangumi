/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-23 16:42:57
 */
import {
  EventType,
  Id,
  Navigation,
  RatingStatus,
  SubjectId,
  // SubjectType,
  SubjectTypeCn,
  ViewStyle
} from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  id?: Id
  name?: string
  nameCn?: string
  cover?: string
  // type?: SubjectType
  typeCn?: SubjectTypeCn
  tip?: string
  rank?: number | string
  score?: number | string
  total?: number | string
  comments?: string
  collection?: string
  collected?: boolean
  position?: string[]
  event?: EventType
  onManagePress?: (args: {
    subjectId: SubjectId
    title: string
    desc: string
    status: RatingStatus
    typeCn: SubjectTypeCn
  }) => any
}
