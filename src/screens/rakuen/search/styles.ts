/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 06:00:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  btn: {
    width: 68,
    height: 40,
    borderRadius: 40
  }
}))
