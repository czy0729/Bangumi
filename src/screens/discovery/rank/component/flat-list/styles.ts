/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-22 20:45:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingBottom: _.bottom
  },
  fixedToolBar: {},
  grid: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md
  }
}))
