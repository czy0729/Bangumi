/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 07:43:24
 */
import { _ } from '@stores'

export const styles = _.create({
  imgContainer: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  layer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    pointerEvents: 'none'
  },
  mask: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.32)'
  }
})
