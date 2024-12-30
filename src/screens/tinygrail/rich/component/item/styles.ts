/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 17:33:44
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
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
  bonus: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: _.colorWarning,
    overflow: 'hidden'
  },
  rank: {
    minWidth: 20,
    marginRight: 6,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: '#ffc107',
    borderRadius: 2,
    overflow: 'hidden'
  },
  amount: {
    marginRight: -_.xs,
    marginLeft: _.md
  }
}))
