/*
 * @Author: czy0729
 * @Date: 2025-03-22 20:02:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-03-22 20:02:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  footer: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.bottom,
    left: _.wind,
    right: _.wind,
    padding: _.sm
  }
}))
