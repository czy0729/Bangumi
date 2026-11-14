/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tint: {
    backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(18, 18, 18, 0.6)')
  }
}))
