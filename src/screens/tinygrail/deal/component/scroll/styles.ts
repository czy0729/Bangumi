/*
 * @Author: czy0729
 * @Date: 2022-11-08 20:23:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-28 06:12:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  form: {
    paddingRight: _.wind - _._wind
  },
  depth: {
    width: Math.floor(_.window.contentWidth * 0.44),
    marginLeft: 18
  }
}))
