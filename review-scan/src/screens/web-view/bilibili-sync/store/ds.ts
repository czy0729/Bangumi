/*
 * @Author: czy0729
 * @Date: 2022-04-28 11:48:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 15:41:39
 */
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { BilibiliItem, Reviews } from '../types'

export const NAMESPACE = `Screen${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 追番记录 (bili) */
  data: {
    list: [] as BilibiliItem[],
    _loaded: 0
  },

  /** 番剧信息 (bili) */
  reviews: {} as Reviews,

  /** 收藏信息 (bgm) */
  collections: {},

  /** 置底数据 */
  bottom: {
    current: 0
  },

  /** 收起 (弹窗) */
  hide: false,

  /** 隐藏看过的条目 */
  hideWatched: false,

  /** 隐藏相同收藏的条目 */
  hideSame: false,

  /** 隐藏未匹配的条目 */
  hideNotMatched: false,

  /** 收藏是否可见 */
  privacy: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
