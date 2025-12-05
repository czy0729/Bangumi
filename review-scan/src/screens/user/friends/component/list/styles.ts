/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:53:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-12 02:53:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  }
}))
