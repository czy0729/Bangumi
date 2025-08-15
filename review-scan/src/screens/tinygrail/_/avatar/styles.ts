/*
 * @Author: czy0729
 * @Date: 2025-05-14 15:21:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-05-14 15:21:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  userStatus: {
    backgroundColor: _.colorTinygrailContainer
  },
  shadow: {
    ..._.shadow,
    backgroundColor: 'rgba(0, 0, 0, 0.01)'
  }
}))
