/*
 * @Author: czy0729
 * @Date: 2022-06-17 11:24:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 11:59:05
 */
import { Id, Navigation, SubjectTypeCn, ViewStyle, EventType } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  num?: number
  id?: Id
  name?: string
  nameCn?: string
  cover?: string
  score?: string | number
  rank?: string | number
  typeCn?: SubjectTypeCn
  collection?: string
  userCollection?: string
  airtime?: string
  aid?: string | number
  wid?: string | number
  mid?: string | number
  isCollect?: boolean
  isRectangle?: boolean
  event?: EventType
}
