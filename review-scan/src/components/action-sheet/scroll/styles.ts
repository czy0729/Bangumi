/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:11:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:11:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scroll: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind - _._wind
  },
  view: {
    paddingTop: _.md,
    paddingHorizontal: _.wind - _._wind
  }
}))
