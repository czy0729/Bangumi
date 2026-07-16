/*
 * @Author: czy0729
 * @Date: 2023-04-12 08:10:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:36:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  error: {
    maxWidth: '100%',
    padding: 4
  },
  icon: {
    opacity: _.select(0.5, 0.3)
  }
}))
