/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:23
 */
import { _ } from '@stores'
import { AVATAR_SIZE, COVER_HEIGHT, COVER_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  inViewAvatar: {
    minWidth: AVATAR_SIZE,
    minHeight: AVATAR_SIZE
  },
  inViewCover: {
    minWidth: COVER_WIDTH,
    minHeight: COVER_HEIGHT
  },
  split: {
    width: 3,
    height: 8,
    marginRight: 8,
    marginLeft: _.select(7, 8),
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
