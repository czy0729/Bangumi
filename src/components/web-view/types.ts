/*
 * @Author: czy0729
 * @Date: 2026-09-02 22:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 22:32:58
 */
import type { WebView, WebViewProps } from 'react-native-webview'

/** WebView 实例引用 */
export type WebViewRef = WebView

/** @deprecated 通用内置浏览器 Props */
export type Props = WebViewProps & {
  /** 页面地址 */
  uri?: string
}

/** 页面注入脚本 postMessage 的消息结构 */
export type WebViewMessage = {
  /** 消息令牌 */
  token?: string
}
