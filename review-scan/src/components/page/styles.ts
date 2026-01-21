/*
 * @Author: czy0729
 * @Date: 2024-11-23 14:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 14:51:15
 */
import { _ } from '@stores'

export const styles = _.create({
  loading: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none'
  }
})
