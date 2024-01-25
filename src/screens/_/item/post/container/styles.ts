/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:49:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 19:51:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: _.window.width,
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  itemWithSub: {
    paddingBottom: _.sm
  }
}))
