/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:35:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:35:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailBg
  },
  inputWrap: {
    paddingLeft: 4,
    borderColor: _.colorTinygrailBorder,
    borderWidth: 1
  },
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  sacrifices: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: 12
  },
  balance: {
    marginTop: 16
  },
  btnSubmit: {
    width: 72
  },
  btnAsk: {
    height: 36
  }
}))
