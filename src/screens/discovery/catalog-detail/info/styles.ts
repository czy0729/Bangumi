/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:36:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:52:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.window.contentWidth
  },
  loading: {
    height: 240
  },
  layout: {
    width: _.r(96),
    height: 32,
    marginRight: _.sm + 2
  },
  sort: {
    width: _.r(128),
    height: 32
  },
  btn: {
    width: _.r(82),
    height: 32
  }
}))
