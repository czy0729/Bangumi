/*
 * @Author: czy0729
 * @Date: 2022-09-02 17:28:56
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-02 17:28:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  old: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.bottom,
    left: _.wind,
    right: _.wind,
    padding: _.sm
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  },
  border: {
    borderLeftWidth: 1,
    borderColor: _.colorBorder
  }
}))
