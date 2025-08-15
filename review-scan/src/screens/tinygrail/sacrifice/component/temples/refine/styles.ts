/*
 * @Author: czy0729
 * @Date: 2024-03-13 06:10:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 06:16:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  step: {
    width: 24,
    height: 24
  },
  stepMinus: {
    borderLeftWidth: 1,
    borderLeftColor: _.colorTinygrailBorder
  },
  minus: {
    width: 12,
    height: 2,
    backgroundColor: _.colorTinygrailIcon
  },
  plus: {
    position: 'absolute',
    zIndex: 1,
    top: 6,
    left: 11,
    width: 2,
    height: 12,
    backgroundColor: _.colorTinygrailIcon
  }
}))
