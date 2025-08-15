/*
 * @Author: czy0729
 * @Date: 2024-01-22 13:19:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-17 09:43:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btn: {
    position: 'absolute',
    zIndex: 1001,
    right: _.wind,
    bottom: 64
  },
  touch: {
    backgroundColor: _.colorTitle,
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  icon: {
    width: 40,
    height: 40
  }
}))
