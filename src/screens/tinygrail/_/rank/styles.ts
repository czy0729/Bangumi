/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 08:09:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    paddingHorizontal: 3,
    marginTop: -1,
    marginRight: 4,
    letterSpacing: -0.5,
    color: _.__colorPlain__,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
