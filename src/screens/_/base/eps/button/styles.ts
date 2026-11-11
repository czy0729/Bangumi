/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:21:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 22:20:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bar: {
    height: 5,
    backgroundColor: _.colorWarning,
    borderRadius: 4
  },
  textThrough: {
    textDecorationLine: 'line-through'
  },
  replied: {
    position: 'absolute',
    zIndex: 1,
    top: 5,
    right: 5,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: _.__colorPlain__,
    opacity: _.select(0.75, 0.64)
  },
  flip: {
    marginTop: -8
  }
}))
