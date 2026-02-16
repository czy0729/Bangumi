/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 05:04:50
 */
import { _ } from '@stores'

export const AVATAR_SIZE = 24

export const memoStyles = _.memoStyles(() => ({
  item: {
    marginRight: _._wind + 2
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: 64,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5
  },
  linearMusic: {
    bottom: -20
  },
  desc: {
    position: 'absolute',
    zIndex: 2,
    right: 3,
    bottom: 3,
    left: _.r(AVATAR_SIZE + 1),
    minHeight: 13,
    opacity: 0.92
  },
  fixed: {
    position: 'absolute',
    zIndex: 2,
    bottom: -1,
    left: -4
  }
}))
