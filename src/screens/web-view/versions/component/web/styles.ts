/*
 * @Author: czy0729
 * @Date: 2024-02-08 17:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:24:28
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
  }
}))
