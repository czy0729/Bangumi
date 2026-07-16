/*
 * @Author: czy0729
 * @Date: 2025-02-22 11:34:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 20:53:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  stats: {
    minWidth: _.window.contentWidth - 80,
    height: 32,
    paddingLeft: 6,
    marginTop: _.sm,
    opacity: 0.75
  },
  block: {
    width: 6,
    marginRight: 3,
    backgroundColor: _.colorPrimary
  },
  max: {
    position: 'absolute',
    zIndex: 1,
    top: -4,
    right: -6
  },
  badge: {
    width: 12,
    height: 12,
    marginRight: 2,
    borderRadius: 6,
    opacity: 0.64
  }
}))
