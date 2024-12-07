/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:52:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 16:03:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
