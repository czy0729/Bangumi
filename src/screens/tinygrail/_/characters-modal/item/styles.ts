/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:59:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:27:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 5,
    paddingLeft: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: _.select('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.16)'),
    borderRadius: _.radiusXs
  },
  bid: {
    backgroundColor: _.colorDepthBid,
    borderColor: _.colorBid
  },
  ask: {
    backgroundColor: _.colorDepthAsk,
    borderColor: _.colorAsk
  },
  rank: {
    minWidth: 16,
    paddingHorizontal: 2
  }
}))
