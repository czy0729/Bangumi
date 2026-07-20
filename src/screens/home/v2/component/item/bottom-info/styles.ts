/*
 * @Author: czy0729
 * @Date: 2026-07-18 05:08:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-21 00:12:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottomInfo: {
    paddingTop: 9,
    paddingHorizontal: _.wind,
    paddingBottom: 16,
    marginTop: -20,
    marginBottom: _.ios(12, 0),
    borderBottomWidth: _.ios(0, 12),
    borderBottomColor: _.colorBg,
    backgroundColor: _.colorPlain
  },
  split: {
    width: 4,
    height: 8,
    marginTop: 1,
    marginRight: 7,
    borderRadius: 4,
    opacity: _.select(1, 0.8)
  }
}))
