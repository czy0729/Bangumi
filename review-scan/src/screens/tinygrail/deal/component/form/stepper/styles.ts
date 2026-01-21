/*
 * @Author: czy0729
 * @Date: 2024-12-28 11:14:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-28 11:14:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  stepper: {
    paddingLeft: 4,
    borderColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon),
    borderWidth: 1
  },
  input: {
    paddingLeft: _.sm,
    height: 34,
    color: _.colorTinygrailPlain,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderRadius: 0
  },
  step: {
    width: 36,
    height: 32
  },
  stepMinus: {
    borderLeftWidth: 1,
    borderLeftColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon)
  },
  split: {
    width: 1,
    height: 14,
    backgroundColor: _.select(_.colorTinygrailBorder, _.colorTinygrailIcon),
    opacity: 0.8
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
    left: 17,
    width: 1,
    height: 14,
    backgroundColor: _.colorTinygrailText
  }
}))
