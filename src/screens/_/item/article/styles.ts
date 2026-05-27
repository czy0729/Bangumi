/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:28:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 07:49:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  cover: {
    marginTop: _.md - 4,
    marginRight: _.sm
  },
  item: {
    paddingTop: 11,
    paddingBottom: _.sm,
    paddingRight: _.wind
  }
}))
