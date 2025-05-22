/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:47:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:30:53
 */
import { GetRouteParams, Loaded, RouteSubjectInfo } from '@types'
import { COMPONENT } from '../ds'

export const NAMESPACE = `Screen${COMPONENT}` as const

export const EXCLUDE_STATE = {
  /** 类型 */
  type: '简介' as '简介' | '详情',

  /** 翻译缓存 */
  translateResult: []
}

export const STATE = {
  ...EXCLUDE_STATE,

  /** 页面初始化完成 */
  _loaded: false as Loaded
}

export type Params = GetRouteParams<RouteSubjectInfo>
