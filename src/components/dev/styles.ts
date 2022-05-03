/*
 * @Author: czy0729
 * @Date: 2022-05-03 16:08:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-03 16:08:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dev: {
    position: 'absolute',
    zIndex: 1000,
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
