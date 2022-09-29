/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:40:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:40:18
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
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
