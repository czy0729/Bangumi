/*
 * @Author: czy0729
 * @Date: 2022-09-01 12:15:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 页面参数与 webview 回传数据
 */
import type { GetRouteParams, RouteAward } from '@types'

export type Params = GetRouteParams<RouteAward>

export type MessageData = {
  /** 点击的链接 */
  href?: string

  /** 点击节点的 html */
  innerHTML?: string

  /** 下一个兄弟节点的 html */
  nextInnerHTML?: string
}
