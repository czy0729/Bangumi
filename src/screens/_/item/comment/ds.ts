/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:44:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-30 21:34:42
 */
import { EVENT } from '@constants'
import {
  CollectionStatusCn,
  EventType,
  Fn,
  Navigation,
  SubjectId,
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
  subjectId: 0 as SubjectId,
  relatedId: '' as string | number,
  event: EVENT as EventType,
  popoverData: undefined as string[] | readonly string[],
  onSelect: undefined as Fn
}
