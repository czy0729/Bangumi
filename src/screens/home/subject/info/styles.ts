/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:53:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-26 00:53:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120
  },
  info: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  }
}))
