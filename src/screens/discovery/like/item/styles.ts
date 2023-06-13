/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 16:10:54
 */
import { _ } from '@stores'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md,
    marginRight: -_.sm
  },
  cover: {
    width: Math.floor(IMG_WIDTH_LG * 1.1),
    height: Math.floor(IMG_HEIGHT_LG * 1.1)
  },
  body: {
    height: Math.floor(IMG_HEIGHT_LG * 1.1),
    paddingLeft: _.md
  },
  title: {
    marginRight: 60
  }
}))
