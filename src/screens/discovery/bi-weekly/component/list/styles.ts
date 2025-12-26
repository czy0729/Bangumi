/*
 * @Author: czy0729
 * @Date: 2024-05-14 05:03:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-21 21:18:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  list: {
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
