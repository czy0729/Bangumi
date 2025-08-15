/*
 * @Author: czy0729
 * @Date: 2023-06-10 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 05:30:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.headerHeight
  },
  segment: {
    width: _.window.width - _.wind * 2,
    height: 32,
    marginLeft: _.wind,
    marginVertical: _.sm
  }
}))
