/*
 * @Author: czy0729
 * @Date: 2024-10-11 08:20:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 01:45:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    opacity: 0.72
  },
  item: {
    paddingVertical: 4,
    paddingHorizontal: 6
  },
  itemLg: {
    paddingVertical: 12
  },
  split: {
    marginHorizontal: -1,
    opacity: _.select(0.44, 0.72),
    pointerEvents: 'none'
  },
  setting: {
    padding: 12,
    marginRight: -8,
    marginLeft: 4,
    opacity: 0.72
  }
}))
