/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:20:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:20:07
 */
import { _ } from '@stores'
import { MENU_RADIUS } from '../ds'

export const styles = _.create({
  menuContainer: {
    position: 'absolute',
    zIndex: 2,
    borderRadius: MENU_RADIUS,
    overflow: 'hidden'
  },
  menuBlur: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  scrollContent: {
    width: '100%'
  },
  scrollView: {
    flex: 1
  }
})
