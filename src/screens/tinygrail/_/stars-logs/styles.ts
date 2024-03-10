/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-10 04:09:19
 */
import { _ } from '@stores'

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
    width: _.r(256),
    backgroundColor: _.colorTinygrailContainer
  }
}))
