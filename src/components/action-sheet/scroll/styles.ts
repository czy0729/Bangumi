/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:11:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 21:05:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scroll: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind - _._wind
  },
  view: {
    paddingTop: _.md,
    paddingHorizontal: _.wind - _._wind
  },
  dragHint: {
    position: 'absolute',
    zIndex: 1,
    top: _.md,
    right: 0,
    left: 0,
    pointerEvents: 'none'
  }
}))
