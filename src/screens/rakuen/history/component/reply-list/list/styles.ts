/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 21:08:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    minHeight: 240
  },
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  readed: {
    backgroundColor: _.colorBg
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  }
}))
