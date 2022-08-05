/*
 * @Author: czy0729
 * @Date: 2022-08-05 07:11:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-05 07:11:21
 */
import { _ } from '@stores'

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
  }
}))
