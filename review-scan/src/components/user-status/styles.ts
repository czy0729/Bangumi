/*
 * @Author: czy0729
 * @Date: 2022-05-04 16:24:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 05:04:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    position: 'absolute',
    zIndex: 10,
    right: -3,
    bottom: -4,
    width: 14,
    height: 14,
    backgroundColor: _.colorPlain,
    borderRadius: 14
  },
  wrapMini: {
    right: -2,
    bottom: -3,
    width: 10,
    height: 10,
    borderRadius: 10
  },
  badge: {
    width: 8,
    height: 8,
    backgroundColor: 'rgb(9, 241, 117)',
    borderRadius: 8
  },
  badgeMini: {
    width: 4,
    height: 4,
    borderRadius: 4
  },
  badgeWarning: {
    backgroundColor: _.colorWarning
  },
  badgeDisabled: {
    backgroundColor: _.colorDisabled
  }
}))
