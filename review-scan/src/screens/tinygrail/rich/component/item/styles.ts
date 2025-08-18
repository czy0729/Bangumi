/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-08 18:31:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  highlight: {
    backgroundColor: _.colorDepthBid
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingHorizontal: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  rank: {
    minWidth: 16,
    marginRight: 4,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: '#ffc107',
    borderRadius: 3,
    overflow: 'hidden'
  }
}))
