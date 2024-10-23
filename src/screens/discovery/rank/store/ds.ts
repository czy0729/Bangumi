/*
 * @Author: czy0729
 * @Date: 2022-07-22 14:46:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-22 07:17:28
 */
import { _ } from '@stores'
import { MODEL_SUBJECT_TYPE, MODEL_TAG_ORDERBY, WEB } from '@constants'
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

export const EXCLUDE_STATE = {
  /** 一级分类 */
  filter: '' as RankFilter,

  /** 二级分类 */
  filterSub: '' as RankFilterSub,

  /** 来源 */
  source: '全部' as Source,

  /** 类型公共标签 */
  tag: '全部' as Tag,

  /** 地区 */
  area: '全部' as Area,

  /** 受众 */
  target: '全部' as Target,

  /** 分级 */
  classification: '全部' as Classification,

  /** 题材 */
  theme: '全部' as Theme,

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

  /** 展开更多选项 */
  expand: false,

  /** 类型 */
  type: MODEL_SUBJECT_TYPE.getLabel('动画'),

  /** 排序 */
  sort: MODEL_TAG_ORDERBY.getValue('排名'),

  /** 年 */
  airtime: '全部' as Airtime,

  /** 月 */
  month: '全部' as Month,

  /** 是否列表布局 (工具条) */
  list: true,

  /** 是否锁定工具条 (工具条) */
  fixed: WEB,

  /** 是否锁定分液器 (工具条) */
  fixedPagination: WEB,

  /** 是否显示收藏条目 (工具条) */
  collected: true,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
