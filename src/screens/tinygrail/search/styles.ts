/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:25:36
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-09 06:25:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  },
  searchBar: {
    paddingTop: _.xs,
    paddingBottom: _.sm,
    paddingHorizontal: _.wind
  }
}))
