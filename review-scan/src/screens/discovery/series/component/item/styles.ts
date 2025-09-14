/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 20:07:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sub: {
    marginTop: -_.sm,
    paddingLeft: _.wind + _.sm
  },
  subItem: {
    paddingVertical: _.md
  }
}))
