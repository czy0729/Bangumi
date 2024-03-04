/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:50:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 28,
    paddingHorizontal: _.xs,
    marginRight: 4,
    color: _.__colorPlain__,
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
