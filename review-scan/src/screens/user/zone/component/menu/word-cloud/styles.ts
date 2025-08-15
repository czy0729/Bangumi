/*
 * @Author: czy0729
 * @Date: 2025-01-24 17:36:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-01-24 17:36:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    padding: 8,
    marginRight: 8,
    opacity: _.select(1, 0.9)
  }
}))
