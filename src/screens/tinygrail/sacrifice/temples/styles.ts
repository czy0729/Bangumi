/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:16:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-11 06:16:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: 120
  },
  temples: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind - _._wind
  },
  info: {
    paddingTop: _.md,
    paddingLeft: _.wind,
    paddingRight: _.wind - _.sm
  },
  expand: {
    paddingVertical: _.md
  }
}))
