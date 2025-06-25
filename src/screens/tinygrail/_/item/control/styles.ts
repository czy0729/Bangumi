/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:04:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-25 22:13:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  control: {
    position: 'absolute',
    zIndex: 1,
    top: -1,
    right: 0
  },
  auctionCancel: {
    marginTop: 8,
    marginRight: 10,
    marginLeft: -10
  },
  stockPreview: {
    marginTop: -0.5,
    marginRight: -12
  },
  status: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 3,
    height: 10,
    marginRight: -1
  }
}))
