/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:21:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-09 16:21:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sectionTitle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingLeft: _.wind
  }
}))
