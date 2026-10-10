/*
 * @Author: czy0729
 * @Date: 2026-04-30 00:30:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 */
import type { WebViewMessageEvent } from 'react-native-webview'

export type Props = {
  /** 年份 */
  year: string

  /** webview 源 */
  source: {
    /** 处理后的 html */
    html: string

    /** 基础地址 */
    baseUrl: string
  }

  /** 加载完成 */
  onLoad: () => void

  /** 加载失败 */
  onError: () => void

  /** webview 消息 */
  onMessage: (event: WebViewMessageEvent) => void
}
