/*
 * @Author: czy0729
 * @Date: 2025-06-09 04:36:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 03:33:05
 */
import { _ } from '@stores'
import { Loaded } from '@types'
import { COMPONENT } from '../ds'
import { List, Srcs } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 标签筛选 */
  filter: '',

  /** 显示列表 */
  show: true,

  /** 是否请求中 */
  fetching: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 分页列表项 */
  list: {} as Record<number, List> & {
    _loaded: Loaded
  },

  /** 实际地址 */
  srcs: {} as Srcs,

  /** 当前分页 */
  page: 1,

  /** 最大分页 */
  pageTotal: 1,

  /** 是否没有搜索结果 */
  empty: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
