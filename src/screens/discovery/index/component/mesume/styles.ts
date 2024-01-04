/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-12 06:08:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  prevent: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.ios(_.tabBarHeight, _.xs),
    right: 0
  },
  touch: {
    width: 132,
    height: 256
  },
  stage: {
    position: 'absolute',
    zIndex: 10,
    bottom: _.ios(_.tabBarHeight, _.xs),
    right: 0,
    width: 128,
    height: 256,
    backgroundColor: 'transparent'
  },
  webview: {
    backgroundColor: 'transparent'
  }
}))
