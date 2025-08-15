/*
 * @Author: czy0729
 * @Date: 2023-07-03 07:20:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 07:22:30
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    minWidth: 96,
    marginRight: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  text: {
    maxWidth: _.r(_.window.contentWidth * 0.24)
  }
}))
