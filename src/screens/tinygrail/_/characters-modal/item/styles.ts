/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:37:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    height: 44,
    paddingHorizontal: 6,
    marginBottom: _.sm,
    borderWidth: 1,
    borderColor: _.select('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.16)'),
    borderRadius: _.radiusXs
  },
  rank: {
    minWidth: 16,
    paddingHorizontal: 2
  }
}))
