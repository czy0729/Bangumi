/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 06:53:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  fixed: {
    position: 'absolute',
    zIndex: 2,
    top: _.headerHeight + 8,
    right: _.wind,
    width: _.window.contentWidth,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    shadowColor: _.colorShadow,
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.16,
    shadowRadius: 6,
    elevation: _.select(16, 0)
  },
  hide: {
    top: _.sm,
    right: _.sm,
    width: 1,
    height: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden'
  },
  body: {
    paddingTop: _.md,
    paddingVertical: 12,
    paddingHorizontal: _._wind
  },
  touch: {
    padding: 8
  },
  lineThrough: {
    textDecorationLine: 'line-through'
  }
}))
