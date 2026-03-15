/*
 * @Author: czy0729
 * @Date: 2023-12-27 15:50:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-14 16:30:11
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    alignItems: 'center',
    overflow: 'hidden'
  },
  layer: {
    ..._.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.16)',
    pointerEvents: 'none'
  },
  mask: {
    ..._.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.32)'
  },
  overflow: {
    justifyContent: 'center',
    alignItems: 'center',
    ..._.absoluteFill
  }
})
