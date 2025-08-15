/*
 * @Author: czy0729
 * @Date: 2023-02-18 04:07:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-18 04:30:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    opacity: 0.64
  },
  commentHistory: {
    marginHorizontal: _.wind,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.select('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)')
  },
  commentHistoryItem: {
    paddingVertical: 12
  }
}))
