/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:08:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.headerHeight + _.sm
  },
  list: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
