/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:21:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 14:47:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120,
    marginTop: _.lg
  },
  sectionTitle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingLeft: _.wind
  }
}))
