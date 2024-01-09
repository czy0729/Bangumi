/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 15:05:21
 */
import { _ } from '@stores'
import { Loaded } from '@types'

export const COMPONENT = 'Calendar'

export const NAMESPACE = `Screen${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

export const STATE = {
  /** 布局 */
  layout: 'list' as 'list' | 'grid',

  /** 筛选 */
  type: 'all' as 'all' | 'collect',

  /** 是否展开所有 */
  expand: false,

  /** 上次请求全局管理单独条目的收藏状态 */
  _lastQueue: 0 as number,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
