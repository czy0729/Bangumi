/*
 * @Author: czy0729
 * @Date: 2024-11-20 09:37:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:51:47
 */
import { MODEL_TINYGRAIL_CACULATE_RICH_TYPE } from '@constants'
import { Loaded, TinygrailCaculateRichType } from '@types'

export const H_TOOL_BAR = 44

export const NAMESPACE = 'ScreenTinygrailTreeRich'

export const KEY = '1/100'

export const DEFAULT_CACULATE_TYPE =
  MODEL_TINYGRAIL_CACULATE_RICH_TYPE.getValue<TinygrailCaculateRichType>('周股息')

export const EXCLUDE_STATE = {
  caculateType: DEFAULT_CACULATE_TYPE,
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
