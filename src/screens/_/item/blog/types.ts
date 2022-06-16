/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:36:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:42:29
 */
import { EventType, Id, Navigation, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  event?: EventType
  id?: Id
  cover?: string
  title?: string
  content?: string
  username?: string
  subject?: string
  time?: string
  replies?: string
  tags?: string[]
}
