/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 14:30:00
 */
import { _ } from '@stores'

/** 开发调试叠加层（cell / header 共用） */
export const styles = _.create({
  dev: {
    position: 'absolute',
    zIndex: 9999,
    top: 0,
    right: 8,
    padding: 2,
    pointerEvents: 'none'
  },
  devHeader: {
    top: 36
  }
})
