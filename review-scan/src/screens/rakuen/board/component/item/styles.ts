/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:13:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-23 05:23:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind + _.md
  },
  readed: {
    backgroundColor: _.colorBg
  }
}))
