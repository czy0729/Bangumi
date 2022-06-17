/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:47:58
 */
import { EventType, Navigation, UserId, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  time?: string
  avatar?: string
  userId?: UserId
  userName?: string
  star?: string | number
  comment?: string
  event?: EventType
}
