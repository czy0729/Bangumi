/*
 * @Author: czy0729
 * @Date: 2025-06-10 20:40:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 01:52:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  pagination: {
    marginTop: 32
  },
  title: {
    paddingVertical: _.sm,
    paddingHorizontal: 12,
    marginHorizontal: _.sm
  },
  active: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: _.colorPrimary,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
