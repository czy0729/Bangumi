/*
 * @Author: czy0729
 * @Date: 2022-06-14 20:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 20:55:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: '100%',
    paddingVertical: _.md,
    paddingHorizontal: _.sm
  },
  current: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 72
  },
  fluctuation: {
    minWidth: 64,
    paddingHorizontal: _.xs,
    borderRadius: 2,
    overflow: 'hidden'
  },
  danger: {
    backgroundColor: _.colorAsk
  },
  success: {
    backgroundColor: _.colorBid
  },
  sub: {
    backgroundColor: _.colorSub
  },
  defaultDark: {
    backgroundColor: _.colorTinygrailText
  },
  floor: {
    width: 64
  },
  floorShowDetail: {
    width: 36
  },
  bids: {
    height: 2,
    backgroundColor: _.colorBid,
    borderRadius: 2,
    overflow: 'hidden'
  },
  asks: {
    height: 2,
    backgroundColor: _.colorAsk,
    borderRadius: 2,
    overflow: 'hidden'
  },
  ico: {
    height: '100%',
    paddingRight: _.wind
  },
  icoBar: {
    width: 96,
    height: 16,
    backgroundColor: _.colorBorder,
    borderRadius: 8,
    overflow: 'hidden'
  },
  icoBarDark: {
    backgroundColor: _.colorTinygrailBorder
  },
  icoProcess: {
    height: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  iconText: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: _.sm
  },
  iconTextDark: {
    color: _.colorTinygrailPlain
  },
  noStock: {
    minWidth: 40,
    marginLeft: _.sm
  }
}))
