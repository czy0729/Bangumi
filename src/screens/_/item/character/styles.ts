/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 01:42:10
 */
import { _ } from '@stores'
import { IMG_WIDTH } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  inView: {
    minWidth: IMG_WIDTH,
    minHeight: IMG_WIDTH
  }
}))
