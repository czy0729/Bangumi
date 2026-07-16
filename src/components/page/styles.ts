/*
 * @Author: czy0729
 * @Date: 2024-11-23 14:50:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:34:01
 */
import { _ } from '@stores'

export const styles = _.create({
  page: {
    overflow: 'hidden'
  },
  loading: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    pointerEvents: 'none'
  },
  visibleBottom: {
    position: 'absolute',
    zIndex: 100,
    top: 36,
    right: _.sm,
    paddingVertical: 2,
    paddingHorizontal: 4,
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    backgroundColor: _.colorBid,
    borderRadius: 4,
    pointerEvents: 'none'
  }
})
