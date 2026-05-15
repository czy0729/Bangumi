/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:36:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:25:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.contentWidth
  },
  info: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  loading: {
    height: 240
  }
}))
