/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:24:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-24 06:27:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentStyle: {
    paddingRight: _.wind - _.md
  },
  extraStyle: {
    marginRight: -2
  }
}))
