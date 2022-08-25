/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:29:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-25 17:29:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  section: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  }
}))
