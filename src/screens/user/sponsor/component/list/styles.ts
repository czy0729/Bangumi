/*
 * @Author: czy0729
 * @Date: 2026-05-16 01:59:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 02:01:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  },
  notice: {
    marginHorizontal: _._wind
  }
}))
