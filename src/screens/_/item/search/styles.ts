/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:17:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:46:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  title: {
    width: '100%',
    paddingRight: 40
  }
}))
