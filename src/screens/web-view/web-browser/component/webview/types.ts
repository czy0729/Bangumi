/*
 * @Author: czy0729
 * @Date: 2025-08-08 22:13:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * WebView 参数
 */
export type Props = {
  /** 页面地址 */
  uri: string

  /** 加载完成后注入的脚本 */
  injectedJavaScript?: string
}
