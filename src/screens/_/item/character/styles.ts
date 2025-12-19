/*
 * @Author: czy0729
 * @Date: 2022-06-17 00:08:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 23:11:20
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
  },
  navigate: {
    marginTop: -8,
    marginRight: -10,
    marginLeft: _.md
  },
  icon: {
    padding: 8
  }
}))
