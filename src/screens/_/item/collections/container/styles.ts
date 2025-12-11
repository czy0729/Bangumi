/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-12 00:16:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  active: {
    backgroundColor: _.colorMainLight
  }
}))
