/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:12:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:58:28
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Chart')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  friend: {} as $['subjectFormHTML']['friend'],
  rating: 0 as $['collection']['rating'],
  total: 0 as $['rating']['total'],
  count: {} as $['rating']['count'],
  score: 0 as $['rating']['score'],
  toRating: FROZEN_FN as $['toRating']
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

export const MESSAGES = [
  '0-1 异口同声',
  '1.15 基本一致',
  '1.3 略有分歧',
  '1.45 莫衷一是',
  '1.6 各执一词',
  '1.75 你死我活'
]
