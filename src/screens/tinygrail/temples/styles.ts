/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:05:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))
