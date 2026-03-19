/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:05:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:28:18
 */
import type { PropsWithChildren } from 'react'
import type { EventType, UserId } from '@types'

export type Props = PropsWithChildren<{
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
}>
