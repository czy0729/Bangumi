/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:38:10
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:38:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  border: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorBorder
  },
  close: {
    padding: _.sm,
    marginLeft: _.md,
    marginRight: -_.sm
  }
}))
