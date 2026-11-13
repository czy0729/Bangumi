/*
 * @Author: czy0729
 * @Date: 2026-11-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { _ } from '@stores'
import { MASK_COLOR } from '@constants'

export const styles = _.create({
  wrap: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mask: {
    flex: 1,
    backgroundColor: MASK_COLOR
  }
})
