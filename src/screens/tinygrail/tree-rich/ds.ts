/*
 * @Author: czy0729
 * @Date: 2024-11-20 09:37:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:23:55
 */
import { MODEL_TINYGRAIL_CALCULATE_RICH_TYPE } from '@constants'

import type { Loaded, TinygrailCalculateRichType } from '@types'

export const H_TOOL_BAR = 44

export const NAMESPACE = 'ScreenTinygrailTreeRich'

export const KEY = '1/100'

export const DEFAULT_CALCULATE_TYPE =
  MODEL_TINYGRAIL_CALCULATE_RICH_TYPE.getValue<TinygrailCalculateRichType>('周股息')

export const EXCLUDE_STATE = {
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

export const HM = ['tinygrail/tree-rich', 'TinygrailTreeRich'] as const
