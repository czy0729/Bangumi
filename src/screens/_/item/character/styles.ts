/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 20:08:04
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
    width: IMG_WIDTH,
    maxHeight: IMG_WIDTH,
    overflow: 'hidden'
  }
}))
