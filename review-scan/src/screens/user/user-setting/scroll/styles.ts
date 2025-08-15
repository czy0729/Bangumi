/*
 * @Author: czy0729
 * @Date: 2022-08-05 10:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 14:37:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  preview: {
    marginHorizontal: _.wind
  }
}))
