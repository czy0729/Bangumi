/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:17:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 04:17:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm
  },
  header: {
    opacity: 0.5
  },
  item: {
    paddingVertical: 4
  },
  index: {
    minWidth: 40
  },
  amount: {
    minWidth: 40
  },
  depthBids: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _.colorDepthBid
  },
  depthAsks: {
    position: 'absolute',
    zIndex: -1,
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: _.colorDepthAsk
  }
}))
