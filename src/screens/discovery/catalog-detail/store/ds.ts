/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 缓存命名空间与状态初始值
 */
import { _ } from '@stores'
import { COLLECT_DS, COMPONENT, DEFAULT_TYPE, LAYOUT_DS, SORT_DS } from '../ds'

import type { Loaded } from '@types'
import type { Collect, Layout, Sort } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 头部是否固定 */
  fixed: false,

  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

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
  type: DEFAULT_TYPE
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 布局 */
  layout: LAYOUT_DS[0].key as Layout,

  /** 当前排序方式项 index */
  sort: SORT_DS[0].key as Sort,

  /** 收藏范围 */
  collect: COLLECT_DS[0].key as Collect,

  /** 倒序 */
  reverse: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
