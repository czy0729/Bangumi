/*
 * @Author: czy0729
 * @Date: 2025-02-04 07:10:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-05 04:19:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wordCloud: {
    padding: 8,
    marginRight: 9,
    opacity: _.select(0.22, 0.4)
  }
}))
