/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:43:08
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-17 12:43:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
