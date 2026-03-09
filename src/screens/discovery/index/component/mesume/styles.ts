/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-09 09:33:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  catch: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: _.tabBarHeight + _.xs
  },
  stage: {
    position: 'absolute',
    zIndex: 10,
    right: -20,
    bottom: _.tabBarHeight + _.xs,
    backgroundColor: 'transparent'
  },
  webview: {
    backgroundColor: 'transparent'
  }
}))
