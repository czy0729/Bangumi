/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:41:01
 */
import {
  EventType,
  Id,
  Navigation,
  SubjectType,
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
  type?: SubjectType
  typeCn?: SubjectTypeCn
  tip?: string
  rank?: number | string
  score?: number | string
  total?: number | string
  comments?: string
  collection?: string
  collected?: boolean
  position?: string
  event?: EventType
}
