/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 01:31:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    minHeight: 320
  },
  top: {
    minHeight: 280
  },
  text: {
    marginTop: _.md,
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize(14)
  },
  btn: {
    marginTop: _.lg,
    width: 120
  }
}))
