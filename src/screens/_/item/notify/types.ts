/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:05:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 05:43:37
 */
import { EventType, UserId } from '@types'

export type Props = {
  index?: number
  avatar?: string
  userId?: UserId
  userName?: string
  title?: string
  message?: string
  message2?: string
  href?: string
  repeat?: number
  event?: EventType
  children?: any
}
