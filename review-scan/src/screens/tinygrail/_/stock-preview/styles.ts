/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:35:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 17:16:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: 17,
    paddingHorizontal: _.r(_.sm)
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    right: _.r(64)
  },
  fluctuation: {
    minWidth: _.r(56),
    paddingHorizontal: _.xs,
    paddingBottom: 0.5,
    borderRadius: 2,
    overflow: 'hidden'
  },
  danger: {
    backgroundColor: _.colorAsk
  },
  success: {
    backgroundColor: _.colorBid
  },
  plain: {
    backgroundColor: _.colorTinygrailIcon
  },
  floor: {
    width: _.r(64)
  },
  floorShowDetail: {
    width: _.r(24)
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
    maxHeight: 68,
    paddingRight: _._wind,
    marginTop: 24
  },
  icoBar: {
    width: _.r(96),
    height: 16,
    backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailBorder),
    borderRadius: 8,
    overflow: 'hidden'
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
    right: _.sm,
    opacity: _.select(0.88, 1)
  },
  bottom: {
    marginTop: 4
  }
}))
