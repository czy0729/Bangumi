/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:47:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  image: {
    backgroundColor: _.colorTinygrailBorder
  }
}))
