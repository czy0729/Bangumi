/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:23:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:24:28
 */
import { _ } from '@stores'

const H_WEBVIEW = Math.min(_.window.height * 0.64, 480)

export const memoStyles = _.memoStyles(() => ({
  chart: {
    height: H_WEBVIEW,
    paddingTop: _.sm,
    backgroundColor: _.colorTinygrailBg,
    borderBottomWidth: _.sm,
    borderBottomColor: _.colorTinygrailBg,
    overflow: 'hidden'
  },
  webview: {
    height: H_WEBVIEW,
    backgroundColor: _.colorTinygrailBg
  },
  loading: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorTinygrailBg
  }
}))
