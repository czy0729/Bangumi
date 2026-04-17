/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:51:30
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true,

  /** 云快照 */
  ota: {}
}

export const STATE = {
  ...EXCLUDE_STATE,

  page: 0,
  rec: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
