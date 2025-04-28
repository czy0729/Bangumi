/*
 * @Author: czy0729
 * @Date: 2024-03-08 15:31:53
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-03-08 15:31:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  info: {
    paddingTop: _.md,
    paddingLeft: _.wind,
    paddingRight: _.wind - _.sm
  },
  touch: {
    paddingVertical: 4,
    paddingHorizontal: 8
  }
}))
