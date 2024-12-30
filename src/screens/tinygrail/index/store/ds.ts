/*
 * @Author: czy0729
 * @Date: 2023-12-17 03:40:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-29 11:11:17
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const ERROR_STR = '/false'

export const MAX_ERROR_COUNT = 3

export const EXCLUDE_STATE = {
  loading: false,
  visible: false,
  count: 0,
  bonus: [],
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

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
