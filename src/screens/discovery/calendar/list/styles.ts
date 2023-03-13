/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:04:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-13 02:59:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind - _.device(_._wind, _._wind + 8)
  }
}))
