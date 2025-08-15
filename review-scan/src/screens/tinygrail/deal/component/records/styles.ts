/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:41:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 20:41:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120,
    paddingTop: _.md,
    paddingBottom: _.lg,
    paddingHorizontal: _.wind,
    borderTopWidth: _.sm,
    borderTopColor: _.colorTinygrailBg
  },
  item: {
    width: '100%',
    paddingVertical: 6
  },
  cancel: {
    paddingVertical: _.sm,
    paddingLeft: _.sm
  },
  expand: {
    paddingVertical: _.sm
  }
}))
