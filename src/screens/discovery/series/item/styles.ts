/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-28 00:26:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sub: {
    marginTop: -_.sm,
    paddingLeft: _.wind + 24,
    paddingBottom: _.md
  },
  subItem: {
    paddingVertical: _.md
  }
}))
