/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-16 23:32:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    marginLeft: _.sm
  }
}))
