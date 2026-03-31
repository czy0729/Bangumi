/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 07:14:10
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
    borderTopColor: _.colorBg,
    borderTopWidth: 1.5
  },
  readed: {
    backgroundColor: _.colorBg
  },
  empty: {
    minHeight: 240
  }
}))
