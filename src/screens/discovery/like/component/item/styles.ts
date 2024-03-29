/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 11:33:05
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'

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
    paddingLeft: _.md
  },
  divider: {
    paddingTop: 10,
    paddingBottom: _.xs
  },
  title: {
    marginRight: 64
  }
}))
