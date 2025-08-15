/*
 * @Author: czy0729
 * @Date: 2022-06-17 13:08:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 08:42:45
 */
import { EventType, Navigation, UserId } from '@types'

export type Props = {
  navigation?: Navigation
  avatar?: string
  userId?: UserId
  userName?: string
  hobby?: string
  percent?: number | string
  recent?: string
  doing?: number | string
  collect?: number | string
  wish?: number | string
  dropped?: number | string
  onHold?: number | string
  filter?: string
  event?: EventType
  children?: any
}
