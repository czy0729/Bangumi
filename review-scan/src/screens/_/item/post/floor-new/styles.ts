/*
 * @Author: czy0729
 * @Date: 2024-10-07 07:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-07 07:44:29
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    position: 'absolute',
    top: -12,
    left: -16,
    pointerEvents: 'none'
  },
  mini: {
    top: 0,
    left: 0
  }
}))
