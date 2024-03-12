/*
 * @Author: czy0729
 * @Date: 2024-03-13 06:10:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:16:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  step: {
    width: 26,
    height: 26
  },
  stepMinus: {
    borderLeftWidth: 1,
    borderLeftColor: _.colorTinygrailBorder
  },
  minus: {
    width: 12,
    height: 1,
    backgroundColor: _.colorTinygrailIcon
  },
  plus: {
    position: 'absolute',
    zIndex: 1,
    top: 7,
    left: 12.5,
    width: 1,
    height: 12,
    backgroundColor: _.colorTinygrailIcon
  }
}))
