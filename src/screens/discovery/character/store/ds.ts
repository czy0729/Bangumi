/*
 * @Author: czy0729
 * @Date: 2023-12-17 08:20:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 18:45:45
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  page: 0,

  /** 页面初始化完成 */
  _loaded: true as Loaded
}
