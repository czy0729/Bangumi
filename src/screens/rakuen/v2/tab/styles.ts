/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-28 15:56:40
 */
import { _ } from '@stores'
import { H_TABBAR, TABS } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  },
  blurViewIOS: {
    position: 'absolute',
    zIndex: 1,
    top: _.device(0, -12),
    right: 0,
    left: -_.window.width * TABS.length,
    height: _.headerHeight + H_TABBAR + _.device(0, 12)
  },
  blurViewAndroid: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight + H_TABBAR,
    backgroundColor: _.ios(
      'transparent',
      _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
    ),
    overflow: 'hidden'
  }
}))
