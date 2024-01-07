/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 17:48:36
 */
import { _ } from '@stores'
import { STORYBOOK } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 2,
    paddingHorizontal: _.wind,
    paddingBottom: STORYBOOK ? 0 : _.bottom,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - _.parallaxImageHeight
  },
  nestScroll: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
