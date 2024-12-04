/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 18:45:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingTop: _.headerHeight + _.sm,
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
    // @ts-expect-error
    position: 'fixed',
    zIndex: 1001,
    top: 9,
    right: 10
  }
}))
