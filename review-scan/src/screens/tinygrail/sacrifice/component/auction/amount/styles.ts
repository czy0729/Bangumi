/*
 * @Author: czy0729
 * @Date: 2024-03-07 21:10:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 21:22:02
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
  btnSubmit: {
    width: 72,
    marginLeft: _.md
  },
  btnAuction: {
    height: 35
  }
}))
