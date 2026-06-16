/*
 * @Author: czy0729
 * @Date: 2022-11-09 05:50:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 06:58:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingHorizontal: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.sm
  },
  status: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: -22
  }
}))
