/*
 * @Author: czy0729
 * @Date: 2022-06-16 22:40:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-16 22:40:08
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
  tag: {
    marginTop: 2,
    marginLeft: _.xs
  }
}))
