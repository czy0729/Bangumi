/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 21:04:58
 */
import { _ } from '@stores'
import {
  MODEL_RAKUEN_SCOPE,
  MODEL_RAKUEN_TYPE_GROUP,
  MODEL_RAKUEN_TYPE_MONO,
  WEB
} from '@constants'
import { Loaded, RakuenScope, RakuenTypeGroup, RakuenTypeMono } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const INIT_PREFETCH_STATE = {
  prefetching: false,
  prefetchTotal: 0,
  prefetchCurrent: 0
}

export const RESET_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height
}

export const EXCLUDE_STATE = {
  ...RESET_STATE,
  isFocused: true,
  swiping: false,
  _mounted: WEB
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 超展开板块 */
  scope: MODEL_RAKUEN_SCOPE.getValue<RakuenScope>('全局聚合'),

  /** Tabs 当前页数 */
  page: 1,

  /** 小组范围 */
  group: MODEL_RAKUEN_TYPE_GROUP.getValue<RakuenTypeGroup>('全部'),

  /** 人物类型 */
  mono: MODEL_RAKUEN_TYPE_MONO.getValue<RakuenTypeMono>('全部'),

  /** Prefetch */
  ...INIT_PREFETCH_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}
