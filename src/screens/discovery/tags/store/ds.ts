/*
 * @Author: czy0729
 * @Date: 2022-09-03 12:36:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:51:30
 *
 * 页面状态初始值与云快照类型
 */
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'
import type { OtaTags } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  ipt: '',
  filter: '',
  isFocused: true,

  /** 云快照 */
  ota: {} as Record<string, OtaTags>
}

export const STATE = {
  ...EXCLUDE_STATE,

  page: 0,
  rec: false,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
