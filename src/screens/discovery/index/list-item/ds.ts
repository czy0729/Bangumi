/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:53:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-09 22:14:02
 */
import { SubjectType, ViewStyle } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  type: 'anime' as SubjectType,
  list: [] as any[],
  friendsChannel: [] as ReturnType<$['friendsChannel']>,
  friendsMap: {} as $['friendsMap']
}
