/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:32:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cover: {
    marginTop: _.md - 4
  },
  item: {
    paddingVertical: _.md - 4,
    paddingRight: _.wind,
    marginLeft: _.sm
  }
}))
