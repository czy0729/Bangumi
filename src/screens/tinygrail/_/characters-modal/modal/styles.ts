/*
 * @Author: czy0729
 * @Date: 2025-05-03 16:04:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-03 16:04:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.r(400),
    backgroundColor: _.select(_.__colorPlain__, _.colorTinygrailContainer),
    borderRadius: _.radiusMd
  },
  focus: {
    marginTop: -Math.floor(_.window.height * 0.56)
  }
}))
