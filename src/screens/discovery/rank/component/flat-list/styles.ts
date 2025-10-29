/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:37:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.headerHeight,
    paddingBottom: _.bottom
  },
  fixedToolBar: {
    paddingTop: _.headerHeight
  },
  grid: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md
  }
}))
