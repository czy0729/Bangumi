/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 19:14:13
 */
import { _ } from '@stores'
import { DRAWER_WITDH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  logs: {
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
  list: {
    zIndex: 4,
    width: DRAWER_WITDH,
    backgroundColor: _.colorTinygrailContainer
  }
}))
