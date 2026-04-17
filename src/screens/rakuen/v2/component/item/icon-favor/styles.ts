/*
 * @Author: czy0729
 * @Date: 2023-12-11 20:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 12:47:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    position: 'absolute',
    right: _.wind - _._wind + 13,
    bottom: 14
  }
}))
