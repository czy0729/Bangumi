/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:30:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:47:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 328,
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  loading: {
    height: 200
  }
}))
