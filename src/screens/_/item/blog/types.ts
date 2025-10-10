/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-10 17:43:34
 */
import { EventType, Id, SubjectTypeCn, ViewStyle } from '@types'

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
