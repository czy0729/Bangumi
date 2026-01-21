/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:53:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 14:54:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
