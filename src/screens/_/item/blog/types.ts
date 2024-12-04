/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 17:26:01
 */
import { EventType, Id, Navigation, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  index?: number
  event?: EventType
  id?: Id
  cover?: string
  title?: string
  content?: string
  username?: string
  subject?: string
  typeCn?: SubjectTypeCn
  time?: string
  replies?: string
  tags?: string[] | string
}

export type Ctx = {
  navigation?: Navigation
}
