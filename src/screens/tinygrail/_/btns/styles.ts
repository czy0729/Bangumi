/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:30:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btns: {
    paddingTop: _.ios(6, 0),
    paddingBottom: _.md
  },
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md - 1,
    marginHorizontal: _.xs,
    backgroundColor: _.select('rgba(238, 238, 238, 0.8)', _.colorTinygrailBorder),
    borderRadius: 16
  }
}))
