/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 20:50:29
 */
import { _ } from '@stores'

export const styles = _.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 6
  },
  title: {
    position: 'absolute',
    zIndex: 2,
    right: 48,
    bottom: 0,
    left: 48,
    pointerEvents: 'none'
  },
  transparent: {
    backgroundColor: 'transparent'
  }
})
