/*
 * @Author: czy0729
 * @Date: 2022-08-25 17:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:45:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 320,
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
