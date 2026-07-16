/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:44:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:36:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    paddingLeft: _.sm
  }
}))
