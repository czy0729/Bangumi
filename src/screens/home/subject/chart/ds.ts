/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:12:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 11:16:41
 */
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  friend: {} as $['subjectFormHTML']['friend'],
  rating: 0 as $['collection']['rating'],
  total: 0 as $['rating']['total'],
  count: {} as $['rating']['count'],
  score: 0 as $['rating']['score'],
  toRating: (() => {}) as $['toRating']
}
