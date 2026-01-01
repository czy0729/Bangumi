/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:08:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-01 14:21:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    marginTop: _.md,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  main: {
    minHeight: 108,
    paddingVertical: _.lg,
    paddingLeft: _.lg,
    backgroundColor: _.select('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.08)')
  },
  sub: {
    minHeight: 108,
    padding: _.lg,
    backgroundColor: _.select('rgba(0, 0, 0, 0.06)', 'rgba(255, 255, 255, 0.08)')
  }
}))
