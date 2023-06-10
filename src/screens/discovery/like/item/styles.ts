/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 01:01:16
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind,
    paddingVertical: 16
  },
  body: {
    height: IMG_HEIGHT_LG,
    paddingLeft: _.md
  },
  title: {
    marginRight: 64
  },
  sub: {
    minWidth: '32%',
    marginRight: _.md,
    marginTop: _.sm
  }
}))
