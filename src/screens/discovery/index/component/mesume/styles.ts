/*
 * @Author: czy0729
 * @Date: 2023-02-12 05:57:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:19:43
 */
import { _ } from '@stores'

export const styles = _.create({
  stage: {
    position: 'absolute',
    zIndex: 10,
    right: _.device(_.ios(-20, -10), 0),
    bottom: _.tabBarHeight + _.ios(_.xs, _.md),
    backgroundColor: 'transparent'
  },
  webview: {
    backgroundColor: 'transparent'
  }
})
