/*
 * @Author: czy0729
 * @Date: 2026-01-04 17:26:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 17:28:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  users: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  }
}))
