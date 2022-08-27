/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-28 00:22:39
 */
import { _ } from '@stores'
import { IMG_HEIGHT_SM } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    height: 120
  },
  item: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md + 8
  },
  body: {
    height: IMG_HEIGHT_SM,
    paddingLeft: _.md
  },
  tagWrap: {
    width: 40,
    marginTop: 1,
    marginLeft: _.sm
  },
  tag: {
    width: 40
  }
}))
