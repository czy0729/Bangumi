/*
 * @Author: czy0729
 * @Date: 2023-02-18 04:07:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 16:09:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: 1,
    bottom: -1,
    opacity: 0.72
  },
  commentHistory: {
    paddingVertical: 12,
    marginHorizontal: _.wind,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.select('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')
  }
}))
