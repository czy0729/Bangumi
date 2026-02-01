/*
 * @Author: czy0729
 * @Date: 2022-09-07 14:38:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:15:30
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Scree${COMPONENT}`

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  list: true,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
