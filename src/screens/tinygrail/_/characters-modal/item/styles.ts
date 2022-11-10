/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:59:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:59:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 5,
    paddingLeft: 6,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: _.colorTinygrailContainer,
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
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    minWidth: 16,
    paddingHorizontal: 2
  }
}))
