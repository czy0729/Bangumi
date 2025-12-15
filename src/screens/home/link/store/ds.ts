/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:39:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-15 15:50:16
 */
import { COMPONENT } from '../ds'

import type { GetRouteParams, Loaded, RouteSubjectLink } from '@types'
import type { RelateMap } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  error: false
}

export const STATE = {
  ...EXCLUDE_STATE,

  map: {
    id: 0,
    node: [],
    relate: []
  } as RelateMap,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export type Params = GetRouteParams<RouteSubjectLink>
