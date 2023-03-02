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
  flip: {
    marginTop: -8
  }
}))
