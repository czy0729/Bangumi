/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-09 17:17:29
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
  avatar: {
    marginTop: _.md,
    marginRight: 12
  }
}))
