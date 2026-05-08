/*
 * @Author: czy0729
 * @Date: 2026-05-01 06:29:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-02 12:21:07
 */
import { _ } from '@stores'
import { AVATAR_SIZE, MOVE_DISTANCE } from './ds'

export const memoStyles = _.memoStyles(() => ({
  collectionTimelines: {
    position: 'absolute',
    zIndex: 1,
    top: -12,
    right: 1
  },
  container: {
    minWidth: 22,
    padding: 2,
    backgroundColor: _.select(_.colorPlain, _.colorDarkModeLevel1),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: _.colorBorder,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    opacity: _.select(0.96, 0.92)
  },
  side: {
    right: -8
  },
  avatarContainer: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    backgroundColor: _.colorPlain,
    borderRadius: AVATAR_SIZE / 2,
    overflow: 'hidden'
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: MOVE_DISTANCE,
    height: AVATAR_SIZE
  },
  countBadge: {
    justifyContent: 'center',
    alignItems: 'center',
    height: AVATAR_SIZE,
    paddingRight: 2,
    paddingLeft: 3.5,
    marginTop: -0.5,
    opacity: 0.8
  }
}))
