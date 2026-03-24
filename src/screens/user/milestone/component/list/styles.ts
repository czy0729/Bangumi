/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:52:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 20:41:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  fixedHeader: {
    paddingHorizontal: _.wind
  },
  container: {
    paddingHorizontal: _.wind,
    paddingBottom: _.web(_.lg, _.bottom)
  }
}))
