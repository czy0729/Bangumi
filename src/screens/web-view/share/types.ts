/*
 * @Author: czy0729
 * @Date: 2026-08-24 18:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 12:00:00
 *
 * 页面参数 + 保存回调 + WebView 消息
 */
import type { GetRouteParams, RouteShare } from '@types'

export type Params = GetRouteParams<RouteShare>

/** 保存成功回调 */
export type OnSuccess = (res?: unknown) => void

/** 保存失败回调, 参数为失败提示文案 */
export type OnFail = (message: string) => void

/** WebView postMessage 消息 (由 html.ts 注入脚本发出) */
export type WebViewMessage = {
  /** 消息类型 */
  type: 'captured' | 'base64'

  /** 消息数据 */
  data?: {
    /** base64 图片 Data URL */
    dataUrl?: string
  }
}
