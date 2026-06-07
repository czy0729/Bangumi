/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:08:57
 */
import { _ } from '@stores'

export const styles = _.create({
  leftMask: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    height: '100%'
  },
  rightMask: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    height: '100%'
  }
})
