/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:12:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:31:29
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

export const DEFAULT_RATES = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0
} as const
