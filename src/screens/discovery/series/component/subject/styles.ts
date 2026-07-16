/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:22:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:17:07
 */
import { _ } from '@stores'
import { IMG_HEIGHT_SM } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  loading: {
    height: 120
  },
  item: {
    paddingHorizontal: _.wind,
    paddingVertical: 20
  },
  body: {
    height: IMG_HEIGHT_SM,
    paddingLeft: _.md
  },
  bodySm: {
    height: Math.floor(IMG_HEIGHT_SM * 0.88),
    paddingLeft: _.md
  },
  manage: {
    marginTop: -2
  }
}))
