/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:21:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:38:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  label: {
    width: 60
  },
  input: {
    height: 36,
    paddingVertical: 0,
    ..._.fontSize12
  }
}))
