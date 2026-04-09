/*
 * @Author: czy0729
 * @Date: 2024-03-05 18:01:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:25:34
 */
import type { EventType, Fn, Id, UserId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  id?: Id
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
  userStarForces?: number
  lastActive?: string
  type?: 'view'
  userId?: UserId
  extra?: string
  state?: number
  showStatus?: boolean
  onPress?: Fn
  onItem?: Fn
}>
