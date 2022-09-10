/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:37:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-10 06:53:11
 */
import { _ } from '@stores'

export const AVATAR_SIZE = 24

export const memoStyles = _.memoStyles(() => ({
  item: {
    marginRight: _._wind + 2,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  linear: {
    position: 'absolute',
    zIndex: 1,
    height: 64,
    right: 0,
    bottom: 0,
    left: 0,
    marginBottom: -0.5,
    borderBottomRightRadius: _.radiusSm,
    borderBottomLeftRadius: _.radiusSm
  },
  desc: {
    position: 'absolute',
    zIndex: 2,
    right: 2,
    bottom: 3,
    left: AVATAR_SIZE + 1,
    opacity: 0.92
  },
  fixed: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    width: 28,
    height: 28,
    marginLeft: -6,
    marginBottom: -2,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderRadius: _.radiusSm + 2
  },
  avatar: {
    backgroundColor: _.select(_.colorPlain, _.colorBg)
  },
  avatarRound: {
    borderRadius: 28
  }
}))
