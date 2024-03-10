/*
 * @Author: czy0729
 * @Date: 2022-11-09 07:03:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 07:03:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginBottom: _.md,
    backgroundColor: _.colorTinygrailContainer
  },
  rank: {
    minWidth: 30,
    marginLeft: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    borderRadius: 4,
    overflow: 'hidden'
  },
  change: {
    minWidth: 30,
    paddingHorizontal: _.xs,
    marginLeft: _.xs,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.32)',
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
