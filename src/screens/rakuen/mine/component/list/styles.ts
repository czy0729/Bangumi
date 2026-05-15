/*
 * @Author: czy0729
 * @Date: 2026-05-16 04:29:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 04:30:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind - _._wind,
    paddingBottom: _.bottom
  }
}))
