/*
 * @Author: czy0729
 * @Date: 2026-01-04 17:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 17:14:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  error: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    marginTop: _.sm
  }
}))
