/*
 * @Author: czy0729
 * @Date: 2025-06-25 22:09:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-06-25 22:09:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  badge: {
    width: 5,
    height: 5,
    marginLeft: 4,
    marginRight: 0.5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  bid: {
    backgroundColor: _.colorBid
  },
  asks: {
    backgroundColor: _.colorAsk
  },
  auction: {
    backgroundColor: _.colorWarning
  }
}))
