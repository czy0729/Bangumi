/*
 * @Author: czy0729
 * @Date: 2023-12-17 06:46:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
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
  ...RESET_STATE,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
