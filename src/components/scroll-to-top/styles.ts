/*
 * @Author: czy0729
 * @Date: 2022-05-04 16:04:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 01:11:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.statusBarHeight + 10
  },
  scrollToTop: {
    position: 'absolute',
    zIndex: 1000,
    right: _._wind,
    bottom: _.r(64)
  },
  touch: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  icon: {
    width: 40,
    height: 40
  }
}))
