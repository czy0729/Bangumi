/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 18:04:33
 */
import { _ } from '@stores'
import { H_TABBAR, TABS } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    top: _.headerHeight - _.sm + 2,
    left: 0
  },
  blurViewIOS: {
    position: 'absolute',
    zIndex: 1,
    top: -_.statusBarHeight || 0,
    right: 0,
    left: -_.window.width * TABS.length,
    height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0)
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
