/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:28:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 15:53:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: _.window.width - (2 * _.wind - _._wind),
    minHeight: 120,
    marginLeft: _.sm,
    marginBottom: _.md
  }
}))
