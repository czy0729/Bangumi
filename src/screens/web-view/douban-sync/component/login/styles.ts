/*
 * @Author: czy0729
 * @Date: 2022-10-17 11:43:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-12 06:14:37
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
    borderRadius: _.radiusMd,
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
    paddingHorizontal: _.md,
    paddingBottom: 28
  },
  btn: {
    width: 128
  },
  btnStyle: {
    height: 40
  },
  user: {
    paddingVertical: 12,
    paddingHorizontal: _._wind
  },
  input: {
    backgroundColor: _.colorBg,
    borderRadius: _.radiusMd
  }
}))
