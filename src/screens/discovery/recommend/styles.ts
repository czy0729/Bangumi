/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 18:00:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingBottom: _.md,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 40,
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
