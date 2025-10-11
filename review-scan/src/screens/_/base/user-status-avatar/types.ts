/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-01 18:04:29
 */
import { ImageProps } from '@components'
import { EventType, Navigation, UserId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  navigation: Navigation
  like: boolean
  userId: UserId
  userName: string
  avatar: ImageProps['src']
  size?: ImageProps['size']
  event?: EventType
}
