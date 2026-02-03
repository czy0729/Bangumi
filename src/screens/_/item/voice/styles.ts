/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 12:05:26
 */
import { _ } from '@stores'
import { AVATAR_SIZE, COVER_HEIGHT, COVER_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  tag: {
    marginTop: 2,
    marginLeft: _.xs
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
