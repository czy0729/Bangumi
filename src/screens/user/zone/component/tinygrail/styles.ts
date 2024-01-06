/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:46:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-22 09:46:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.parallaxImageHeight + _.md * 2,
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
