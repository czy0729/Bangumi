/*
 * @Author: czy0729
 * @Date: 2020-05-27 10:49:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 10:53:59
 */
import { SDK } from '@constants'

let WebView
if (SDK === 37) {
  WebView = require('./index.37.js').default
} else {
  WebView = require('./index.35.js').default
}

export default WebView
