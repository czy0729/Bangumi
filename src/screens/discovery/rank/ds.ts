/*
 * @Author: czy0729
 * @Date: 2022-07-22 14:46:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 21:00:59
 */
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE, STORYBOOK } from '@constants'
import {
  RankAnimeFilter,
  RankBookFilter,
  RankGameFilter,
  RankRealFilter,
  SubjectType
} from '@types'

export const NAMESPACE = 'ScreenRank'

export const DEFAULT_TYPE = MODEL_SUBJECT_TYPE.getLabel<SubjectType>('动画')

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  /** 当前页数 */
  page: 0,

  /** 各类型当前页数 */
  currentPage: {
    all: 1,
    anime: 1,
    book: 1,
    game: 1,
    music: 1,
    real: 1
  },

  /** 各类型当前 Input 页数 */
  ipt: {
    all: '1',
    anime: '1',
    book: '1',
    game: '1',
    music: '1',
    real: '1'
  },

  /** 类型筛选 */
  type: DEFAULT_TYPE,

  /** 二级筛选 */
  filter: '' as RankAnimeFilter | RankBookFilter | RankGameFilter | RankRealFilter,

  /** 年筛选 */
  airtime: '',

  /** 月筛选 */
  month: '',

  /** 是否列表布局 (工具条) */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: STORYBOOK,

  /** 是否锁定分液器 (工具条) */
  fixedPagination: STORYBOOK,

  /** 是否显示收藏条目 (工具条) */
  collected: true,

  ...EXCLUDE_STATE,
  _loaded: false
}
