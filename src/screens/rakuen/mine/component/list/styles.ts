/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-27 00:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))
