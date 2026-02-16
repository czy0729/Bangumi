/*
 * @Author: czy0729
 * @Date: 2022-11-09 05:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:45:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingRight: _.wind
  },
  item: {
    paddingVertical: _.md
  }
}))
