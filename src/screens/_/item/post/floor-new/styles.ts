/*
 * @Author: czy0729
 * @Date: 2024-10-07 07:16:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:26:36
 */
import { _ } from '@stores'

export const styles = _.create({
  image: {
    position: 'absolute',
    top: -12,
    left: -16,
    pointerEvents: 'none',
    borderTopLeftRadius: _.radiusMd,
    overflow: 'hidden'
  },
  mini: {
    top: 0,
    left: 0
  }
})
