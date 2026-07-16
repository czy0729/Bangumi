/*
 * @Author: czy0729
 * @Date: 2022-05-03 18:19:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-14 20:27:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  empty: {
    paddingHorizontal: _.wind,
    minHeight: Math.floor(_.window.height * 0.64)
  }
}))
