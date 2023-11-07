/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:48:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-08 00:48:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  }
}))
