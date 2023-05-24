/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:41:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 15:34:15
 */
import { _ } from '@stores'

export const NAMESPACE = 'ScreenRecommend'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 输入框聚焦中 */
  focus: false,

  /** 查询搜索中 */
  searching: false,

  /** 缓存条目快照 */
  subjects: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 输入框值 */
  value: '',

  /** 推荐结果 */
  data: {
    /** 分数超过 8分, 看过人数超过 10000 的作品 */
    top: [],

    /** 近年来的流行作品，收藏数的排名在前 20% */
    pop: [],

    /** 通常的 tv 动画 */
    tv: [],

    /** 06 年及以前的老动画 */
    old_tv: [],

    /** 动画电影 / 剧场版 */
    movie: [],

    /** 06 年及以前动画电影 / 剧场版 */
    old_movie: [],

    /** 绝大多数是里番 */
    nsfw: [],

    _loaded: 0
  },

  _loaded: false
}
