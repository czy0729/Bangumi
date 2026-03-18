/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:29:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:55:08
 */
import type { EventType, UserId, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    event?: EventType
    avatar?: string
    title?: string
    summary?: string
    nickname?: string
    userId?: UserId
    timestamp?: string | number
    replies?: string | number
    url?: string
  }>
>
