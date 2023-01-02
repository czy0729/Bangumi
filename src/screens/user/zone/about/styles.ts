/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:59:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-22 01:59:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 2,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - _.parallaxImageHeight
  }
}))
