/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-22 16:54:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  inView: {
    minWidth: 40,
    minHeight: 40,
    marginRight: _.sm
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind + _.md
  }
}))
