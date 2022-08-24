/*
 * @Author: czy0729
 * @Date: 2022-08-25 05:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 06:05:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    position: _.ios('absolute', undefined),
    zIndex: 100,
    right: 0,
    bottom: 0,
    left: 0,
    height: _.tabBarHeight,
    backgroundColor: _.ios(
      'transparent',
      _.select(_.colorPlain, _.deep(_._colorPlain, _._colorDarkModeLevel1))
    ),
    borderTopWidth: _.ios(0, _.select(_.hairlineWidth, _.deep(0, _.hairlineWidth))),
    borderTopColor: _.ios(
      'transparent',
      _.select(_.colorBorder, _.deep('transparent', 'rgba(0, 0, 0, 0.16)'))
    )
  },
  item: {
    height: 50
  },
  icon: {
    width: 24,
    height: 24
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}))
