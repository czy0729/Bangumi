/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 23:20:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  title: {
    width: '100%',
    paddingRight: 40
  }
}))
