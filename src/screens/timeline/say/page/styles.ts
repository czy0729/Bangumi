/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:26:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 06:26:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  expand: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 52,
    height: 50,
    paddingVertical: _.sm,
    backgroundColor: _.colorPlain,
    borderRadius: 28
  },
  users: {
    position: 'absolute',
    zIndex: 1,
    right: _.wind,
    bottom: 52,
    left: _.wind,
    height: 50,
    paddingVertical: _.sm,
    backgroundColor: _.colorPlain,
    borderRadius: 28,
    overflow: 'hidden'
  },
  contentContainerStyle: {
    height: 34,
    paddingHorizontal: 8
  },
  list: {
    paddingBottom: _.bottom + _.lg
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 24,
    height: 24
  }
}))
