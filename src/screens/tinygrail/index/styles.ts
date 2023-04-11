/*
 * @Author: czy0729
 * @Date: 2022-11-07 13:58:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:46:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingBottom: _.md
  }
}))
