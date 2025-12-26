/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 00:41:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingTop: _.sm,
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 40,
    marginLeft: _.sm,
    borderRadius: 40
  },
  home: {
    position: 'fixed' as any,
    zIndex: 1001,
    top: 9,
    right: 10
  }
}))
