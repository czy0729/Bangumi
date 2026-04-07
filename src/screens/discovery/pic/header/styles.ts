/*
 * @Author: czy0729
 * @Date: 2026-04-05 23:33:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-05 23:34:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  background: {
    backgroundColor: _.select('rgba(255, 255, 255, 0.64)', 'rgba(0, 0, 0, 0.64)')
  },
  loading: {
    marginLeft: 4,
    marginRight: -22
  }
}))
