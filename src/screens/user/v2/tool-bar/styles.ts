/*
 * @Author: czy0729
 * @Date: 2022-08-04 20:54:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-04 20:54:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: _.colorPlain
  },
  list: {
    paddingBottom: 0
  }
}))
