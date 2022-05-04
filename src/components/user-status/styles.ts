/*
 * @Author: czy0729
 * @Date: 2022-05-04 16:24:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-04 16:24:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    position: 'absolute',
    zIndex: 10,
    right: -3,
    bottom: -3,
    width: 14,
    height: 14,
    backgroundColor: _.colorPlain,
    borderRadius: 14
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: _.colorSuccess,
    borderRadius: 8
  },
  badgeWarning: {
    backgroundColor: _.colorWarning
  }
}))
