/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:27:43
 */
import { _ } from '@stores'

export const styles = _.create({
  icon: {
    position: 'absolute',
    zIndex: 1,
    right: _._wind,
    marginRight: -5,
    bottom: 21
  },
  list: {
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
})
