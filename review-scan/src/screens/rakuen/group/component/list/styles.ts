/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:33:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-03 04:33:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  readed: {
    backgroundColor: _.colorBg
  },
  empty: {
    minHeight: 240
  }
}))
