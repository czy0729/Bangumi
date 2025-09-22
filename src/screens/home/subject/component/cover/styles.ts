/*
 * @Author: czy0729
 * @Date: 2022-08-25 21:10:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-22 17:49:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: _.md + 6,
    left: _.wind
  },
  placeholder: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  },
  cover: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
}))
