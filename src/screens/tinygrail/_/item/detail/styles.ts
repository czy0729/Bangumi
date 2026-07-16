/*
 * @Author: czy0729
 * @Date: 2025-01-13 22:28:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:35:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  detail: {
    paddingRight: _._wind,
    marginTop: 5
  },
  text: {
    letterSpacing: -0.2 + _.letterSpacing
  }
}))
