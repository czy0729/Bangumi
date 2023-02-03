/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:44:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-03 16:59:31
 */
import { EVENT } from '@constants'
import {
  CollectionStatusCn,
  EventType,
  Fn,
  Navigation,
  UserId,
  ViewStyle
} from '@types'
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
  status: '' as CollectionStatusCn,
  comment: '' as string,
  event: EVENT as EventType,
  popoverData: undefined as string[],
  onSelect: undefined as Fn
}
