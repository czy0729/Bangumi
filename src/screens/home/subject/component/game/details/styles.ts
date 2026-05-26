/*
 * @Author: czy0729
 * @Date: 2024-08-13 12:26:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-26 22:14:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  details: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  },
  pinBtn: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    marginTop: -1,
    marginRight: -2,
    opacity: 0.8
  }
}))
