/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 22:25:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: _._wind,
    marginRight: -5,
    bottom: 21
  },
  list: {
    paddingTop: _.sm,
    minHeight: 520
  },
  loadMore: {
    marginTop: _.md,
    paddingVertical: 12
  },
  ft: {
    marginTop: 56,
    marginRight: _._wind,
    marginBottom: -_.bottom + _.lg,
    opacity: 0.8
  }
}))
