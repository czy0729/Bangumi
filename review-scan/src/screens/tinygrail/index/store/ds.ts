/*
 * @Author: czy0729
 * @Date: 2023-12-17 03:40:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-20 16:20:28
 */
import { Loaded } from '@types'
import { COMPONENT, STAR_INDEX_WEIGHT } from '../ds'
import { Bonus } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const ERROR_STR = '/false'

export const MAX_ERROR_COUNT = 3

export const EXCLUDE_STATE = {
  loading: false,
  visible: false,
  count: 0,
  bonus: [] as Bonus,
  isBonus2: false,
  show: false
}

export const STATE = {
  loadingAssets: false,
  loadingBonus: false,
  currentBalance: 0,
  currentTotal: 0,
  lastBalance: 0,
  lastTotal: 0,

  lastStarIndexWeight: STAR_INDEX_WEIGHT,
  starIndexWeight: STAR_INDEX_WEIGHT,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
