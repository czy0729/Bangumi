/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:48:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 *
 * Store 常量: 命名空间 / 状态
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { SearchSort } from '@utils/kv'
import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 输入框内容 */
  value: '',

  /** 已提交的搜索关键字, 用于分页 */
  keyword: '',

  /** 搜索请求中 */
  searching: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 排序 */
  sort: 'match' as SearchSort,

  history: [] as string[],

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
