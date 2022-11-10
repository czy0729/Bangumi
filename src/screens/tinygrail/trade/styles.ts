/*
 * @Author: czy0729
 * @Date: 2022-11-11 02:33:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 02:34:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dark: {
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingBottom: 56
  },
  kline: {
    backgroundColor: _.colorTinygrailBg
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 40,
    left: 0
  },
  fixed: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    padding: _.sm,
    backgroundColor: _.colorTinygrailContainer
  },
  btnBid: {
    backgroundColor: _.colorBid,
    borderWidth: 0,
    borderRadius: 0
  },
  btnAsk: {
    backgroundColor: _.colorAsk,
    borderWidth: 0,
    borderRadius: 0
  }
}))
