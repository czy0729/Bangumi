/*
 * @Author: czy0729
 * @Date: 2025-02-14 08:35:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-27 05:19:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  trend: {
    marginRight: -_.sm
  },
  typeScore: {
    height: 148,
    paddingHorizontal: _.wind,
    marginTop: _.md
  },
  typeScoreBar: {
    width: 1.5,
    backgroundColor: _.select('rgba(200, 200, 200, 0.8)', 'rgba(255, 255, 255, 0.2)')
  },
  typeScoreText: {
    width: 40,
    marginLeft: -18,
    marginBottom: 2,
    opacity: _.select(1, 0.64)
  },
  typeScoreActive: {
    backgroundColor: _.colorPrimary,
    opacity: _.select(1, 0.64)
  },
  label: {
    width: '52%'
  },
  value: {
    width: '24%'
  },
  reverse: {
    marginTop: _.ios(4, -1),
    transform: [
      {
        rotate: '180deg'
      }
    ]
  },
  info: {
    marginRight: -26,
    opacity: _.select(1, 0.64)
  }
}))
