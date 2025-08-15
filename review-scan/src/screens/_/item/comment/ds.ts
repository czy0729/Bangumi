/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:44:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 18:52:18
 */
import { rc } from '@utils/dev'
import { EVENT } from '@constants'
import { CollectionStatusCn, EventType, Fn, Navigation, SubjectId, UserId, ViewStyle } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ItemComment')

export const COMPONENT_MAIN = rc(COMPONENT)

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
  mainId: '' as string,
  mainName: '' as string,
  event: EVENT as EventType,
  popoverData: undefined as string[] | readonly string[],
  like: false,
  onSelect: undefined as Fn
}
