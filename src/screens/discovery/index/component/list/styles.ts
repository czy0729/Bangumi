/*
 * @Author: czy0729
 * @Date: 2026-03-26 02:44:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:21:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    minHeight: _.window.height
  }
}))
