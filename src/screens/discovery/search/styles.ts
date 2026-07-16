/*
 * @Author: czy0729
 * @Date: 2024-01-09 11:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:17:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingTop: _.sm,
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  }
}))
