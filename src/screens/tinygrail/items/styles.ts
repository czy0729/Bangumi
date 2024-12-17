/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:23:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  image: {
    backgroundColor: _.colorTinygrailBorder
  }
}))
