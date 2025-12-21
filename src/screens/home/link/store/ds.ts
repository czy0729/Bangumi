/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:39:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 23:23:04
 */
import { _ } from '@stores'
import { COMPONENT } from '../ds'

import type { Loaded } from '@types'
import type { RelateMap } from '../types'

export const NAMESPACE = `Screen${COMPONENT}` as const

/** 页面每次进入和退出都需要还原的状态 */
export const RESET_STATE = {
  /** 当前页面实例是否在路由栈中 (用于退出页面后马上拦截剩余的请求) */
  focused: false
}

/** 页面首次初始化后需要还原的状态 */
export const EXCLUDE_STATE = {
  ...RESET_STATE,

  /** 是否显示配置 */
  show: false,

  /** 是否获取数据失败 */
  error: false,

  /** 当前页面实例是否在路由栈中 (用于退出页面后马上拦截剩余的请求) */
  focused: false,

  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

/** 页面实例状态 */
export const STATE = {
  ...EXCLUDE_STATE,

  /** 关联图数据结构 */
  map: {
    id: 0,
    node: [],
    relate: []
  } as RelateMap,

  /** 隐藏的条目类型 */
  hideTypes: [] as string[],

  /** 隐藏的条目平台 */
  hidePlatforms: [] as string[],

  /** 隐藏的关系线类型 */
  hideRelates: [] as string[],

  /** 趋势 */
  trend: 0,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
