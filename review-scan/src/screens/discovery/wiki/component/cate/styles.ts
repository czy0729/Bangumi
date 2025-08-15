/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:15:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:06:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: _.window.width - _.wind * 2,
    height: _.r(32),
    marginLeft: _.wind,
    marginTop: _.sm + 2
  }
}))
