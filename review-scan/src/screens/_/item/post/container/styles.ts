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
    paddingTop: 12,
    paddingBottom: 12,
    paddingHorizontal: _.wind
  },
  itemWithSub: {
    paddingBottom: _.sm
  },
  new: {
    backgroundColor: _.select(_.colorMainLightBorder, 'rgb(59, 48, 51)')
  }
}))
