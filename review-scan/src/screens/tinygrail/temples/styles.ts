/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 15:44:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.headerHeight + _.xs,
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))
