/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-05 05:34:14
 */
import { _ } from '@stores'
import { ViewStyle } from '@types'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => {
  const tabs: ViewStyle = {
    position: 'absolute',
    zIndex: 1,
    top: -_.statusBarHeight || 0,
    right: 0,
    height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0),
    backgroundColor: _.ios(
      'transparent',
      _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
    )
  }
  return {
    blurViewIOS4: {
      ...tabs,
      left: -_.window.width * 3
    },
    blurViewIOS5: {
      ...tabs,
      left: -_.window.width * 4
    },
    blurViewAndroid: {
      ...tabs,
      top: 0,
      left: 0,
      height: _.headerHeight + H_TABBAR,
      overflow: 'hidden'
    },
    sceneContainerStyle: {
      marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
    }
  }
})
