/*
 * @Author: czy0729
 * @Date: 2022-06-14 22:57:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-03 14:40:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  delete: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    marginRight: -_._wind
  }
}))
