/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-21 16:58:58
 */
import { _ } from '@stores'
import { H_TABBAR } from '../../ds'

const H_TOOLBAR = _.r(42)

export const memoStyles = _.memoStyles(() => ({
  listView: {
    zIndex: 0
  },
  list: {
    paddingBottom: _.bottom,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight - H_TOOLBAR
  },
  grid: {
    paddingLeft: _.wind - _._wind - _.device(0, 8),
    paddingRight: _.wind - _._wind,
    paddingBottom: _.bottom,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight - H_TOOLBAR
  },
  header: {
    height: _.parallaxImageHeight + H_TABBAR - _.radiusLg
  }
}))
