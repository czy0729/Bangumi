/*
 * @Author: czy0729
 * @Date: 2022-07-30 12:47:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 10:02:52
 */
import { _ } from '@stores'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants'
import { Loaded, RatingStatus, SearchCat, SearchLegacy } from '@types'

export const COMPONENT = 'Search'

export const NAMESPACE = `Screen${COMPONENT}`

export const DEFAULT_CAT = MODEL_SEARCH_CAT.getValue<SearchCat>('动画')

export const DEFAULT_LEGACY = MODEL_SEARCH_LEGACY.getValue<SearchLegacy>('模糊')

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 输入框值 */
  _value: '',

  /** 确认的输入框值 */
  value: '',

  /** 输入框聚焦中 */
  focus: false,

  /** 查询搜索中 */
  searching: false,

  /** 收藏管理框 */
  modal: {
    visible: false,
    subjectId: 0,
    title: '',
    desc: '',
    status: '' as '' | RatingStatus,
    action: '听' as '看' | '玩' | '听' | '读'
  }
}

export const STATE = {
  /** 搜索历史 */
  history: [] as string[],

  /** 列表 */
  cat: DEFAULT_CAT,

  /** 是否精准查询 */
  legacy: DEFAULT_LEGACY,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
