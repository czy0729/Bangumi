/*
 * @Author: czy0729
 * @Date: 2025-04-20 16:18:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 14:54:39
 */
import { COMPONENT, ITEMS_DS } from '../ds'

import type { Loaded } from '@types'
import type { ItemsType } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {}

export const STATE = {
  ...EXCLUDE_STATE,

  page: 0,

  /** 前往路由 */
  go: '卖出',

  /** 过滤道具类型 */
  itemsType: ITEMS_DS[0] as ItemsType,

  _loaded: false as Loaded
}
