/*
 * @Author: czy0729
 * @Date: 2023-02-13 16:00:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:35:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    paddingVertical: 6,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  settings: {
    position: 'absolute',
    zIndex: 1,
    top: -2,
    right: _.wind - 7
  },
  icon: {
    padding: 8
  }
}))
