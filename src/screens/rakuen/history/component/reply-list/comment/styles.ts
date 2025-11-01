/*
 * @Author: czy0729
 * @Date: 2024-06-09 16:39:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 21:05:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comment: {
    paddingHorizontal: 12,
    marginHorizontal: _.wind,
    marginBottom: _.md,
    borderWidth: 1,
    borderColor: _.select('rgb(228, 228, 236)', 'rgba(255, 255, 255, 0.24)'),
    borderRadius: _.radiusMd
  },
  item: {
    paddingVertical: 12
  },
  border: {
    borderTopWidth: 1,
    borderTopColor: _.select('rgb(228, 228, 236)', 'rgba(255, 255, 255, 0.24)')
  },
  likes: {
    marginLeft: '-5%',
    marginBottom: -12,
    transform: [
      {
        scale: 0.9
      }
    ]
  }
}))
