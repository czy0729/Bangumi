/*
 * @Author: czy0729
 * @Date: 2025-05-31 21:57:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-31 22:01:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  progress: {
    height: 4,
    marginHorizontal: _.md,
    backgroundColor: _.select(_.colorBorder, _.colorTinygrailIcon),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  progressBar: {
    height: 4,
    backgroundColor: _.colorBid,
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.5
  }
}))
