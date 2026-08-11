/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  pagination: {
    position: 'absolute',
    alignItems: 'center'
  },
  paginationX: {
    bottom: 10,
    left: 0,
    right: 0
  },
  paginationY: {
    right: 10,
    top: 0,
    bottom: 0
  },
  pointStyle: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: _.colorIcon
  },
  pointActiveStyle: {
    backgroundColor: _.colorDesc
  },
  spaceStyle: {
    marginHorizontal: _.xs,
    marginVertical: _.xs / 2
  }
}))