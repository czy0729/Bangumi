/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-14 00:20:58
 */
import { EventType, UserId } from '@types'

export type Props = {
  event?: EventType
  position?: 'left' | 'right'
  avatar?: string
  showName?: boolean
  name?: string
  text?: string
  id?: UserId
  time?: string
  format?: boolean
  onLongPress?: () => any
}
