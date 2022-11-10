/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:35:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:35:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  input: {
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  step: {
    width: 32,
    height: 32
  },
  stepMinus: {
    borderLeftWidth: 1,
    borderLeftColor: _.colorTinygrailBorder
  },
  split: {
    width: 1,
    height: 14,
    backgroundColor: _.colorTinygrailBorder
  },
  minus: {
    width: 14,
    height: 1,
    backgroundColor: _.colorTinygrailText
  },
  plus: {
    position: 'absolute',
    zIndex: 1,
    top: 9,
    left: 16,
    width: 1,
    height: 14,
    backgroundColor: _.colorTinygrailText
  }
}))
