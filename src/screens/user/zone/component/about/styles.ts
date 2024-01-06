/*
 * @Author: czy0729
 * @Date: 2022-10-22 01:59:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 20:41:14
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
  }
}))
