/*
 * @Author: czy0729
 * @Date: 2025-05-14 15:27:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 15:34:19
 */
import { AvatarProps } from '@components'
import { EventType, Navigation } from '@types'

export type Props = {
  navigation: Navigation
  src: AvatarProps['src']
  size: AvatarProps['size']
  userId: AvatarProps['userId']
  name: AvatarProps['name']
  last?: string
  shadow?: boolean
  event?: EventType
}
