/*
 * @Author: czy0729
 * @Date: 2024-12-28 11:07:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-28 11:07:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btn: {
    padding: 8,
    marginBottom: 8,
    backgroundColor: _.colorTinygrailBorder
  },
  btnBid: {
    backgroundColor: _.colorBid
  },
  btnAsk: {
    backgroundColor: _.colorAsk
  }
}))
