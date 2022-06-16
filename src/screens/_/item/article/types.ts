/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:33:56
 */
import { EventType, Navigation, UserId, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  event?: EventType
  avatar?: string
  title?: string
  summary?: string
  nickname?: string
  userId?: UserId
  timestamp?: string | number
  replies?: string
  url?: string
}
