/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-26 10:32:36
 */
import type { EventType, UserId } from '@types'

export type Props = {
  index?: number
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
