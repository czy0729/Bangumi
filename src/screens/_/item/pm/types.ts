/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:59:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:28:58
 */
import type { EventType, Id, UserId } from '@types'

export type Props = {
  event?: EventType
  index?: number
  id?: Id
  title?: string
  content?: string
  avatar?: string
  name?: string
  userId?: UserId
  time?: string
  new?: boolean
  onRefresh?: () => any
}
