/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:57:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  logs: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  wrap: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  list: {
    zIndex: 4,
    width: _.r(256),
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md
  },
  segment: {
    width: _.r(96),
    height: _.r(28)
  }
}))
