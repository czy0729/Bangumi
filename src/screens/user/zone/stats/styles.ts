/*
 * @Author: czy0729
 * @Date: 2022-12-26 04:30:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:41:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 3,
    paddingHorizontal: _.wind,
    minHeight: _.window.height + _.parallaxImageHeight - _.tabBarHeight
  },
  page: {
    minHeight: _.window.height - _.parallaxImageHeight
  },
  touch: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
