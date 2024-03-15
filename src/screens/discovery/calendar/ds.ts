/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 04:26:50
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

export const LAYOUT_DS = [
  {
    key: 'list',
    title: '列表'
  },
  {
    key: 'grid',
    title: '网格'
  }
] as const

export const TYPE_DS = [
  {
    key: 'all',
    title: '全部'
  },
  {
    key: 'collect',
    title: '收藏'
  }
] as const

export const STATE = {
  /** 布局 */
  layout: LAYOUT_DS[0].key as (typeof LAYOUT_DS)[number]['key'],

  /** 筛选 */
  type: TYPE_DS[0].key as (typeof TYPE_DS)[number]['key'],

  /** 是否展开所有 */
  expand: false,

  /** 上次请求全局管理单独条目的收藏状态 */
  _lastQueue: 0 as number,
  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
