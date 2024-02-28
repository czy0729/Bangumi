/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:52:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-25 17:53:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  grid: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md
  },
  left: {
    marginLeft: 0
  }
}))
