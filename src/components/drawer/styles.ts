/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 15:28:49
 */
import { _ } from '@stores'
import { DRAWER_WITDH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  menu: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  wrap: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
  },
  body: {
    zIndex: 4,
    width: DRAWER_WITDH,
    height: _.window.height,
    backgroundColor: _.colorPlain
  }
}))
