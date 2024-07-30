/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:21:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-29 19:26:00
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT, LAYOUT_DS, SORT_DS } from '../ds'

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
  }
}

export const STATE = {
  /** 布局 */
  layout: LAYOUT_DS[0].key as (typeof LAYOUT_DS)[number]['key'],

  /** 当前排序方式项 index */
  sort: SORT_DS[0].key as (typeof SORT_DS)[number]['key'],

  ...EXCLUDE_STATE,
  _loaded: false as Loaded
}
