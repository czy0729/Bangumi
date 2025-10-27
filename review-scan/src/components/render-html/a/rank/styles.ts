/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:06:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-01-19 08:06:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 24,
    paddingHorizontal: 6,
    marginRight: 8,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: _.select('#ffc107', _._colorDarkModeLevel2),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
