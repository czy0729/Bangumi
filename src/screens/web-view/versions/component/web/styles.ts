/*
 * @Author: czy0729
 * @Date: 2024-02-08 17:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 云文档 WebView 容器与加载态
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  webview: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  loading: {
    marginTop: Math.floor(_.window.height * 0.25)
  },
  text: {
    paddingHorizontal: _.wind
  },
  hidden: {
    opacity: 0
  }
}))
