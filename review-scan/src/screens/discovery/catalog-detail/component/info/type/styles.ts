/*
 * @Author: czy0729
 * @Date: 2025-01-07 15:37:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-07 15:45:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: _.window.width - 80,
    height: 30
  }
}))
