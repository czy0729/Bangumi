/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:35:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 18:50:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  inputWrap: {
    borderColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon),
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  starforce: {
    position: 'absolute',
    zIndex: 1,
    top: 9,
    right: 12
  },
  btnSubmit: {
    width: 72,
    marginLeft: _.md
  },
  btnAsk: {
    height: 35
  }
}))
