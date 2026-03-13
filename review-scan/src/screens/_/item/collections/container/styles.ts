/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:56:49
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-01-24 05:56:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  }
}))
