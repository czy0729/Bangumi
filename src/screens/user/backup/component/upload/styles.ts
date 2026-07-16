/*
 * @Author: czy0729
 * @Date: 2022-12-18 15:28:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:41:30
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
    bottom: _.lg,
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
  container: {
    minHeight: 128,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  webview: {
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  body: {
    paddingTop: 20,
    paddingHorizontal: _.md,
    paddingBottom: 28
  },
  btn: {
    width: 128
  },
  btnStyle: {
    height: 40
  }
}))
