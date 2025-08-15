/*
 * @Author: czy0729
 * @Date: 2024-11-30 03:56:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:31:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: _.window.width - _.wind * 2,
    height: 30,
    marginLeft: _.wind
  }
}))
