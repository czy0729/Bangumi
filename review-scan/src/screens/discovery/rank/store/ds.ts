/*
 * @Author: czy0729
 * @Date: 2022-07-22 14:46:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:53:48
 */
import { _ } from '@stores'
import {
  DATA_AIRTIME,
  DATA_ANIME_AREA,
  DATA_ANIME_TAG,
  DATA_ANIME_TARGET,
  DATA_CLASSIFICATION,
  DATA_MONTH,
  DATA_SOURCE,
  DATA_THEME,
  MODEL_SUBJECT_TYPE,
  MODEL_TAG_ORDERBY
} from '@constants'
import {
  Airtime,
  Area,
  Classification,
  Loaded,
  Month,
  RankFilter,
  RankFilterSub,
  Source,
  Tag,
  Target,
  Theme
} from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 一级分类 */
  filter: '' as RankFilter,

  /** 二级分类 */
  filterSub: '' as RankFilterSub,

  /** 来源 */
  source: DATA_SOURCE[0] as Source,

  /** 类型公共标签 */
  tag: DATA_ANIME_TAG[0] as Tag,

  /** 地区 */
  area: DATA_ANIME_AREA[0] as Area,

  /** 受众 */
  target: DATA_ANIME_TARGET[0] as Target,

  /** 分级 */
  classification: DATA_CLASSIFICATION[0] as Classification,

  /** 题材 */
  theme: DATA_THEME[0] as Theme,

  /** 是否显示列表, 制造切页效果 */
  show: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

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

  /** 展开更多选项 */
  expand: false,

  /** 类型 */
  type: MODEL_SUBJECT_TYPE.getLabel('动画'),

  /** 排序 */
  sort: MODEL_TAG_ORDERBY.getValue('排名'),

  /** 年 */
  airtime: DATA_AIRTIME[0] as Airtime,

  /** 月 */
  month: DATA_MONTH[0] as Month,

  /** 是否列表布局 (工具条) */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: true,

  /** 是否锁定分液器 (工具条) */
  fixedPagination: true,

  /** 是否显示收藏条目 (工具条) */
  collected: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
