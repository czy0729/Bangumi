/*
 * @Author: czy0729
 * @Date: 2022-11-08 17:35:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 17:35:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 32,
    left: _.wind
  },
  btn: {
    width: 104,
    borderRadius: 48
  }
}))
