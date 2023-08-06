/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:24:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 19:26:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  mask: {
    height: _.window.height,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
}))
