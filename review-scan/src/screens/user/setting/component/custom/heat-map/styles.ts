/*
 * @Author: czy0729
 * @Date: 2022-07-18 08:23:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-18 08:23:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bar: {
    height: 4,
    backgroundColor: _.colorWarning,
    borderRadius: 4
  },
  bar0: {
    opacity: 0
  },
  bar1: {
    opacity: 0.2
  },
  bar2: {
    opacity: 0.4
  },
  bar3: {
    opacity: 0.9
  }
}))
