/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:25:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 02:25:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    borderRadius: 6,
    overflow: 'hidden'
  },
  overflowView: {
    position: 'absolute',
    top: -8,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent'
  }
}))
