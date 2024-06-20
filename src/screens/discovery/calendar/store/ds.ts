/*
 * @Author: czy0729
 * @Date: 2022-07-26 04:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-20 17:57:06
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT, LAYOUT_DS, TYPE_DS } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}`

export const EXCLUDE_STATE = {
  /** 改编 */
  adapt: '',

  /** 标签 */
  tag: '',

  /** 动画制作 */
  origin: '',

  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否加载 bangumi-data */
  loadedBangumiData: false
}

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
