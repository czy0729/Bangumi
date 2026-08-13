/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  pagination: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8
  },
  paginationX: {
    right: 0,
    bottom: 10,
    left: 0
  },
  paginationY: {
    top: 0,
    right: 10,
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
    marginVertical: _.xs / 2,
    marginHorizontal: _.xs
  }
}))
