/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:28:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-21 15:29:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: _.window.width - (2 * _.wind - _._wind),
    marginBottom: _.md
  }
}))
