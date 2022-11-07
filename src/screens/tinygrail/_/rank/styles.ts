/*
 * @Author: czy0729
 * @Date: 2022-11-07 17:18:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 17:18:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rank: {
    minWidth: 30,
    marginRight: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
