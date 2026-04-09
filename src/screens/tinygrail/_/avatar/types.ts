/*
 * @Author: czy0729
 * @Date: 2025-05-14 15:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 08:14:05
 */
import type { AvatarProps } from '@components'
import type { EventType, WithNavigation } from '@types'

export type Props = WithNavigation<{
  src: AvatarProps['src']
  size: AvatarProps['size']
  userId: AvatarProps['userId']
  name: AvatarProps['name']
  last?: string
  shadow?: boolean
  event?: EventType
}>
