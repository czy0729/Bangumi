/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 17:00:05
 */
import { ImageProps } from '@components'
import { EventType, UserId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  like: boolean
  userId: UserId
  userName: string
  avatar: ImageProps['src']
  size?: ImageProps['size']
  event?: EventType
}
