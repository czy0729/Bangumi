/*
 * @Author: czy0729
 * @Date: 2022-06-17 13:08:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 13:13:24
 */
import { EventType, Navigation, UserId } from '@types'

export type Props = {
  navigation?: Navigation
  avatar?: string
  userId?: UserId
  userName?: string
  hobby?: string
  percent?: number
  recent?: string
  doing?: string
  collect?: string
  wish?: string
  dropped?: string
  onHold?: string
  event?: EventType
  children?: any
}
