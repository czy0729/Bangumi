/*
 * @Author: czy0729
 * @Date: 2022-06-17 13:08:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:25:48
 */
import type { PropsWithChildren } from 'react'
import type { EventType, UserId } from '@types'

export type Props = PropsWithChildren<{
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
}>
