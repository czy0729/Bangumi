/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:14:16
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-25 19:14:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  section: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    marginLeft: _.sm + 4
  },
  tag: {
    marginTop: 3,
    marginLeft: _.md
  }
}))
