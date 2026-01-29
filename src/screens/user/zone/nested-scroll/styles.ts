/*
 * @Author: czy0729
 * @Date: 2024-01-07 20:38:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-29 13:05:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tab: {
    flex: 1,
    width: Math.floor(_.window.contentWidth / 5)
  }
}))
