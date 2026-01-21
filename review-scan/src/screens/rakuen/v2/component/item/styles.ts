/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:12:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:08:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  inView: {
    minWidth: 40,
    minHeight: 40
  },
  wrap: {
    paddingRight: _.wind - _._wind,
    marginTop: 2
  }
}))
