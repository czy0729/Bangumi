/*
 * @Author: czy0729
 * @Date: 2024-05-03 23:08:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 05:34:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.headerHeight + _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
