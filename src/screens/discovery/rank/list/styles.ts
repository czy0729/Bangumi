/*
 * @Author: czy0729
 * @Date: 2022-07-22 15:34:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-22 15:34:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scrollView: {
    paddingBottom: _.md
  },
  grid: {
    paddingHorizontal: _.wind,
    paddingVertical: _.md
  },
  loading: {
    width: '100%',
    paddingTop: _.md,
    paddingVertical: _.wind
  },
  left: {
    marginLeft: 0
  }
}))
