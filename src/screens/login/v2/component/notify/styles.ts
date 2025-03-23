/*
 * @Author: czy0729
 * @Date: 2025-03-22 20:16:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-03-22 20:16:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  notify: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
}))
