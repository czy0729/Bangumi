/*
 * @Author: czy0729
 * @Date: 2026-04-21 21:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-22 17:42:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    zIndex: 1002,
    width: 8,
    height: 8,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.88,
    shadowRadius: 12,
    elevation: 10
  },
  staticHalo: {
    position: 'absolute',
    zIndex: 1001,
    width: 8,
    height: 8,
    borderRadius: 10,
    opacity: 0.3
  }
}))
