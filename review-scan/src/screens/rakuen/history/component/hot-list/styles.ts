/*
 * @Author: czy0729
 * @Date: 2024-11-01 13:23:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-01 13:23:07
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
