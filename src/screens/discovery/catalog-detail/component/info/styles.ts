/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:36:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 信息区布局
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
