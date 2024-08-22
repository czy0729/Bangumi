/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 01:31:31
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
    paddingTop: _.md,
    minHeight: _.window.height - _.parallaxImageHeight
  },
  nestScroll: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
