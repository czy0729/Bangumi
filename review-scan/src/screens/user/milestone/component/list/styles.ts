/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:52:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-14 06:35:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  list: {
    minHeight: _.window.height
  },
  container: {
    minHeight: _.window.height,
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.web(_.lg, _.bottom)
  }
}))
