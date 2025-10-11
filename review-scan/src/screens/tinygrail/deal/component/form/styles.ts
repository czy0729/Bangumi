/*
 * @Author: czy0729
 * @Date: 2024-12-28 05:49:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-28 05:49:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingBottom: _.md - 4,
    paddingLeft: _.wind
  }
}))
