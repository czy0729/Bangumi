/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-07 16:02:07
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COLLECT_DS, COMPONENT, LAYOUT_DS, SORT_DS } from '../ds'
import { Collect, Layout, Sort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** Modal */
  visible: false,

  /** 正在编辑的目录项 */
  defaultEditItem: null,

  /** 进度条 */
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  },

  /** 类型筛选 */
  type: '动画'
}

export const STATE = {
  /** 布局 */
  layout: LAYOUT_DS[0].key as Layout,

  /** 当前排序方式项 index */
  sort: SORT_DS[0].key as Sort,

  /** 收藏范围 */
  collect: COLLECT_DS[0].key as Collect,

  /** 倒序 */
  reverse: false,

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
