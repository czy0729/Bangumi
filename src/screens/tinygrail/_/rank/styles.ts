/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 06:34:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 28,
    paddingHorizontal: _.xs,
    marginTop: -1,
    marginRight: 4,
    color: _.__colorPlain__,
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
