/*
 * @Author: czy0729
 * @Date: 2022-11-07 13:58:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 21:46:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    flex: 1,
    paddingHorizontal: _.wind
  },
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingBottom: _.md + _.tabBarHeight
  }
}))
