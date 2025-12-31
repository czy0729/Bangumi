/*
 * @Author: czy0729
 * @Date: 2025-12-31 21:08:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-31 21:22:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  item: {
    paddingVertical: _.md
  }
}))
