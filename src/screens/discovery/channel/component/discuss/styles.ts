/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-16 08:03:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  content: {
    paddingVertical: 14,
    paddingRight: _._wind
  },
  side: {
    marginTop: -2,
    marginLeft: _.lg
  }
}))
