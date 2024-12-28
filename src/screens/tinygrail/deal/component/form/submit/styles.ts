/*
 * @Author: czy0729
 * @Date: 2024-12-28 11:46:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-28 11:46:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btn: {
    padding: 8,
    marginVertical: 8
  },
  text: {
    color: _.__colorPlain__
  },
  btnBid: {
    backgroundColor: _.colorBid
  },
  btnAsk: {
    backgroundColor: _.colorAsk
  }
}))
