/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:33:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:20:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 34,
    paddingVertical: 0,
    paddingHorizontal: _.wind,
    fontSize: 14 + _.fontSizeAdjust,
    color: _.colorTinygrailPlain,
    backgroundColor: _.colorTinygrailContainer,
    borderColor: _.colorTinygrailText,
    borderWidth: 1,
    borderRadius: 64
  },
  btn: {
    width: 80,
    height: 34,
    borderRadius: 64,
    backgroundColor: _.colorTinygrailContainer,
    borderColor: _.colorTinygrailText,
    borderWidth: 1
  }
}))
