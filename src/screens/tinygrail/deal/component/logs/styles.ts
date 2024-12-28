/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:39:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 20:39:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120,
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: _.colorTinygrailBg
  },
  item: {
    width: '100%'
  },
  cancel: {
    paddingVertical: _.sm,
    paddingLeft: _.sm
  }
}))
