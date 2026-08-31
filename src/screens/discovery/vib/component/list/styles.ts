/*
 * @Author: czy0729
 * @Date: 2026-08-31 16:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 16:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
