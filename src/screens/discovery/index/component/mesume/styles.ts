/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-01 16:04:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  prevent: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.tabBarHeight + _.xs,
    right: 0
  },
  touch: {
    width: 132,
    height: 256
  },
  stage: {
    position: 'absolute',
    zIndex: 10,
    bottom: _.tabBarHeight + _.xs,
    right: 0,
    width: 128,
    height: 256,
    backgroundColor: 'transparent'
  },
  webview: {
    backgroundColor: 'transparent'
  }
}))
