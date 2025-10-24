/*
 * @Author: czy0729
 * @Date: 2023-12-17 10:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 12:31:26
 */
import { _ } from '@stores'

import type { Loaded } from '@types'

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE
}

export const STATE = {
  ...EXCLUDE_STATE,
  value: '',
  placeholder: '',
  replySub: '',
  message: '',

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
