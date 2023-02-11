/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-12 06:08:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  stage: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.tabBarHeight,
    right: 0,
    width: 128,
    height: 256,
    backgroundColor: 'transparent'
  },
  webview: {
    backgroundColor: 'transparent'
  }
}))
