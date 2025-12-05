/*
 * @Author: czy0729
 * @Date: 2025-04-21 22:36:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-21 23:51:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: Math.floor(_.window.width - _.wind * 2),
    height: 30,
    marginTop: 12,
    marginLeft: _.wind,
    marginBottom: 4
  }
}))
