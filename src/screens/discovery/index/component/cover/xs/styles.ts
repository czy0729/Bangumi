/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:51:17
 */
import { _ } from '@stores'

export const AVATAR_SIZE = 24

export const styles = _.create({
  item: {
    marginRight: _._wind + 2
  },
  desc: {
    position: 'absolute',
    zIndex: 4,
    right: 3,
    bottom: 3,
    left: 3,
    minHeight: 13,
    opacity: 0.92
  },
  withAvatar: {
    left: _.r(AVATAR_SIZE + 1)
  },
  fixed: {
    position: 'absolute',
    zIndex: 4,
    bottom: -1,
    left: -4
  }
})
