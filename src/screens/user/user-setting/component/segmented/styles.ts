/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:32:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:50:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segmented: {
    width: _.window.contentWidth,
    height: 36,
    marginBottom: 24
  }
}))
