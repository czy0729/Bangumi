/*
 * @Author: czy0729
 * @Date: 2024-11-20 08:57:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:22:51
 */
import { MODEL_TINYGRAIL_ASSETS_TYPE, MODEL_TINYGRAIL_CALCULATE_TYPE } from '@constants'

import type { Loaded } from '@types'

export const TINYGRAIL_VALHALL_ID = 'valhalla@tinygrail.com'

export const H_TOOL_BAR = 44

export const NAMESPACE = 'ScreenTinygrailTree'

export const DEFAULT_TYPE = MODEL_TINYGRAIL_ASSETS_TYPE.getValue('所有')

export const DEFAULT_CALCULATE_TYPE = MODEL_TINYGRAIL_CALCULATE_TYPE.getValue('周股息')

export const EXCLUDE_STATE = {
  type: DEFAULT_TYPE,
  calculateType: DEFAULT_CALCULATE_TYPE,
  loading: false,
  data: [],
  total: 0,
  filterItems: []
}

export const STATE = {
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}

export const HM = ['tinygrail/tree', 'TinygrailTree'] as const
