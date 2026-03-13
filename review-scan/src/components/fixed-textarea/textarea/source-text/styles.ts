/*
 * @Author: czy0729
 * @Date: 2023-07-30 18:24:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-07-30 18:24:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  source: {
    position: 'absolute',
    zIndex: 2,
    right: 4,
    bottom: _.md,
    left: 0
  },
  opacity: {
    opacity: 0.8
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  touch: {
    padding: _.xs,
    marginRight: -_.sm,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
