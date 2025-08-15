/*
 * @Author: czy0729
 * @Date: 2024-03-03 07:04:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 00:25:58
 */
import { _ } from '@stores'

const PADDING = 4

export const memoStyles = _.memoStyles(() => ({
  progress: {
    padding: PADDING,
    borderWidth: 1,
    borderColor: _.select('rgba(0, 0, 0, 0.16)', 'rgba(255, 255, 255, 0.24)'),
    borderRadius: 8,
    overflow: 'hidden'
  },
  progressXs: {
    padding: PADDING - 2,
    borderRadius: 6
  },
  bar: {
    height: 12,
    borderRadius: 4,
    overflow: 'hidden'
  },
  barXs: {
    height: 8,
    borderRadius: 3
  },
  text: {
    position: 'absolute',
    zIndex: 2,
    top: 0.5,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
