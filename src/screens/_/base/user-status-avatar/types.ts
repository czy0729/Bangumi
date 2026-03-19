/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:33:05
 */
import type { ImageProps } from '@components'
import type { EventType, UserId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  like: boolean
  userId: UserId
  userName: string
  avatar: ImageProps['src']
  size?: ImageProps['size']
  event?: EventType
}>
