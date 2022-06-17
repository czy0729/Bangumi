/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:03:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 20:06:42
 */
import { EventType, UserId } from '@types'

export type Props = {
  event?: EventType
  index?: number
  position?: 'left' | 'right'
  avatar?: string
  showName?: boolean
  name?: string
  text?: string
  id?: UserId
  format?: boolean
  onLongPress?: () => any
}
