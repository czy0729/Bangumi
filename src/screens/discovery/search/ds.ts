/*
 * @Author: czy0729
 * @Date: 2022-07-30 12:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 16:58:35
 */
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants'
import { SearchCat, SearchLegacy } from '@types'

export const NAMESPACE = 'ScreenSearch'

export const DEFAULT_CAT = MODEL_SEARCH_CAT.getValue<SearchCat>('动画')

export const DEFAULT_LEGACY = MODEL_SEARCH_LEGACY.getValue<SearchLegacy>('精确')

export const EXCLUDE_STATE = {
  value: '',
  searching: false,
  focus: false
}

export const STATE = {
  /** 搜索历史 */
  history: [] as string[],

  /** 列表 */
  cat: DEFAULT_CAT,

  /** 是否精准查询 */
  legacy: DEFAULT_LEGACY,

  ...EXCLUDE_STATE,
  _loaded: false
}
