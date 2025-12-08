/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:44:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 17:51:58
 */
import { rc } from '@utils/dev'
import { EVENT } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { CollectionStatusCn, EventType, Fn, SubjectId, UserId, ViewStyle } from '@types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ItemComment')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
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
