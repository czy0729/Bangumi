/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 08:13:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 12,
    paddingHorizontal: 3,
    marginTop: -1,
    marginRight: 4,
    letterSpacing: -0.5 + _.letterSpacing,
    color: _.__colorPlain__,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
