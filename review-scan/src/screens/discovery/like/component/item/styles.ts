/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:36:10
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
  title: {
    marginRight: 64
  },
  manage: {
    height: 32,
    marginTop: _.web(8, 0),
    marginLeft: _.web(-_.sm, -2)
  },
  extra: {
    width: '100%',
    marginTop: _.sm
  }
}))
