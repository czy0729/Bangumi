/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 12:41:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    paddingHorizontal: 3,
    marginTop: -1,
    marginRight: 4,
    letterSpacing: -0.5 + _.letterSpacing,
    color: _.__colorPlain__,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
