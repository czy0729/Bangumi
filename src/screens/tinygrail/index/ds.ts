/*
 * @Author: czy0729
 * @Date: 2023-12-17 03:40:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 19:10:41
 */
import { Loaded } from '@types'

export const COMPONENT = 'Tinygrail'

export const NAMESPACE = `Screen${COMPONENT}`

export const TITLE = '小圣杯'

export const ERROR_STR = '/false'

export const MAX_ERROR_COUNT = 3

export const EXCLUDE_STATE = {
  loading: false,
  visible: false,
  count: 0,
  bonus: [],
  isBonus2: false,
  _loaded: false as Loaded
}

export const STATE = {
  loadingAssets: false,
  loadingBonus: false,
  currentBalance: 0,
  currentTotal: 0,
  lastBalance: 0,
  lastTotal: 0,
  ...EXCLUDE_STATE
}
