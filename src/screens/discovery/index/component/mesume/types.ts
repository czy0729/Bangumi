/*
 * @Author: czy0729
 * @Date: 2026-03-12 22:50:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 05:19:21
 */
import type { WebView } from 'react-native-webview'

export type Props = {
  /** WebView 实例引用回调 */
  forwardRef: (ref: WebView) => void

  /** WebView 加载完成 */
  loaded: boolean

  /** WebView 消息回调 (加载完成信号) */
  onMessage: () => void
}
