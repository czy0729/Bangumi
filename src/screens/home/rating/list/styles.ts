/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:52:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 10:52:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingHorizontal: _.wind,
    paddingTop: _.md,
    paddingBottom: _.bottom,
    minHeight: _.window.height
  }
}))
