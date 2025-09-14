/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:32:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:44:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm
  },
  header: {
    paddingLeft: _.sm,
    paddingRight: _.wind
  },
  list: {
    minHeight: 128
  },
  current: {
    paddingVertical: _.sm,
    paddingHorizontal: _.sm
  },
  currentPrice: {
    marginLeft: -4
  },
  block: {
    width: '100%',
    marginVertical: -_.hairlineWidth
  },
  item: {
    width: '100%',
    paddingVertical: 5
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
    right: 0,
    bottom: 0,
    backgroundColor: _.colorDepthAsk
  },
  dotBid: {
    width: 5,
    height: 5,
    marginLeft: -5,
    borderRadius: 5,
    backgroundColor: _.colorBid
  },
  dotAsk: {
    width: 5,
    height: 5,
    marginLeft: -5,
    borderRadius: 5,
    backgroundColor: _.colorAsk
  }
}))
