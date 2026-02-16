/*
 * @Author: czy0729
 * @Date: 2024-02-08 17:47:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 11:26:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  webview: {
    flex: 1,
    backgroundColor: _.colorPlain
  },
  loading: {
    marginTop: _.window.height * 0.25
  },
  text: {
    paddingHorizontal: _.wind
  }
}))
