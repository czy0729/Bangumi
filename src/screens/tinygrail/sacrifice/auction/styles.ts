/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:44:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:44:47
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
  popover: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0
  },
  count: {
    width: 34,
    height: 34,
    borderLeftWidth: 1,
    borderColor: _.colorTinygrailBorder
  },
  slider: {
    height: 40
  },
  btnAuction: {
    height: 36
  },
  btnSubmit: {
    width: 72
  }
}))
