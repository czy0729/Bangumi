/*
 * @Author: czy0729
 * @Date: 2026-08-09 05:52:47
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 05:52:47
 */
import { _ } from '@stores'

export const styles = _.create({
  holdItem: {
    position: 'absolute',
    zIndex: 10
  },
  portalOverlay: {
    position: 'absolute',
    zIndex: 15,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
