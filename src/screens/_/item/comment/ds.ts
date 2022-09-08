/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:44:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 16:53:00
 */
import { EVENT } from '@constants'
import { EventType, Navigation, UserId, ViewStyle } from '@types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  time: '' as string,
  avatar: '' as string,
  userId: '' as UserId,
  userName: '' as string,
  star: '' as string | number,
  comment: '' as string,
  event: EVENT as EventType
}
