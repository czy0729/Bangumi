/*
 * @Author: czy0729
 * @Date: 2024-11-08 04:56:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 06:58:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  summary: {
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
