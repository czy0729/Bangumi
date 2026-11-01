/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:04:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 16:22:00
 *
 * 缓存命名空间与状态初始值
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 是否显示目录管理弹窗 */
  modal: false,

  /** 是否显示新建目录表单 */
  form: false
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  page: 0,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
