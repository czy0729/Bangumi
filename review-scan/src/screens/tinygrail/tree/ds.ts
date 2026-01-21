/*
 * @Author: czy0729
 * @Date: 2024-11-20 08:57:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 05:27:16
 */
import { MODEL_TINYGRAIL_ASSETS_TYPE, MODEL_TINYGRAIL_CACULATE_TYPE } from '@constants'
import { Loaded } from '@types'

export const TINYGRAIL_VALHALL_ID = 'valhalla@tinygrail.com'

export const H_TOOL_BAR = 44

export const NAMESPACE = 'ScreenTinygrailTree'

export const DEFAULT_TYPE = MODEL_TINYGRAIL_ASSETS_TYPE.getValue('所有')

export const DEFAULT_CACULATE_TYPE = MODEL_TINYGRAIL_CACULATE_TYPE.getValue('周股息')

export const EXCLUDE_STATE = {
  type: DEFAULT_TYPE,
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

export const HM = ['tinygrail/tree', 'TinygrailTree'] as const
