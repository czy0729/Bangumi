/*
 * @Author: czy0729
 * @Date: 2025-07-26 21:21:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-26 21:28:14
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 上一期 */
  prev: 0
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
