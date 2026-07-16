/*
 * @Author: czy0729
 * @Date: 2022-09-03 04:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:46:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  list: {
    minHeight: _.window.height,
    marginVertical: _.md
  }
}))
