/*
 * @Author: czy0729
 * @Date: 2020-05-27 10:49:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-10 16:37:59
 */
import { WebView } from 'react-native'
import { SDK } from '@constants'

// eslint-disable-next-line import/no-mutable-exports
let _WebView
if (SDK >= 36) {
  _WebView = require('react-native-webview').WebView
} else {
  _WebView = WebView
}

export default _WebView
