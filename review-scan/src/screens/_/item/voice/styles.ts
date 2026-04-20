/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 12:05:26
 */
import { _ } from '@stores'
import { IMG_WIDTH_SM, IMG_HEIGHT_SM } from '@constants'
import { AVATAR_SIZE } from './ds'

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
    minWidth: IMG_WIDTH_SM,
    minHeight: IMG_HEIGHT_SM
  }
}))
