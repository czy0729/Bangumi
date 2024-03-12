/*
 * @Author: czy0729
 * @Date: 2024-03-05 18:01:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 18:37:20
 */
import { EventType, Fn, UserId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  assets?: number
  avatar?: string
  cover: string
  coverSize?: 150 | 480
  event?: EventType
  level: number
  cLevel?: number
  name?: string
  rank?: number
  nickname?: string
  sacrifices?: number
  refine: number
  lastActive?: string
  type?: 'view'
  userId?: UserId
  onPress?: Fn
}
