/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:40:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 06:57:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind,
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  touch: {
    paddingVertical: _.md
  }
}))
