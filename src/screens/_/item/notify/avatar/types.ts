/*
 * @Author: czy0729
 * @Date: 2025-10-12 05:11:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-12 05:12:38
 */
import type { EventType, UserId, WithIndex } from '@types'

export type Props = WithIndex<{
  avatar: string
  userId: UserId
  userName: string
  event: EventType
}>
