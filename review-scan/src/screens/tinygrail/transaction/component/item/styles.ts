/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:20:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-08 21:23:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 12
  },
  avatar: {
    width: 80,
    paddingRight: 12
  },
  inView: {
    minWidth: 52,
    minHeight: 52
  },
  content: {
    padding: 15,
    paddingTop: 12,
    marginTop: -1,
    borderRadius: _.radiusMd
  },
  border: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 5,
    borderRadius: _.radiusMd,
    borderColor: _.select('rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0.88)'),
    pointerEvents: 'none'
  },
  shadow: {
    ..._.shadow,
    backgroundColor: 'rgba(0, 0, 0, 0.01)'
  }
}))
