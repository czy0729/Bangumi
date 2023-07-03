/*
 * @Author: czy0729
 * @Date: 2023-07-03 10:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-03 10:40:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: _.window.width - _.wind * 2,
    height: 30,
    marginLeft: _.wind,
    marginVertical: _.sm
  }
}))
