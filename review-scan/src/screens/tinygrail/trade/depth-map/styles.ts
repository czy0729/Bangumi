/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:14:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:17:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: 48,
    borderTopWidth: 1,
    borderTopColor: _.colorTinygrailBorder
  },
  title: {
    position: 'absolute',
    top: 24,
    left: _.sm
  },
  info: {
    padding: _.sm
  },
  block: {
    height: 160
  },
  bids: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    marginLeft: -1.5,
    borderTopColor: _.colorBid,
    borderTopWidth: 1,
    borderRightColor: _.colorBid,
    borderRightWidth: 1,
    backgroundColor: _.colorDepthBid
  },
  asks: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    borderTopColor: _.colorAsk,
    borderTopWidth: 1,
    borderLeftColor: _.colorAsk,
    borderLeftWidth: 1,
    backgroundColor: _.colorDepthAsk
  },
  rod: {
    position: 'absolute',
    zIndex: 100,
    top: _.md + _.sm,
    right: _.sm,
    bottom: 56
  }
}))
