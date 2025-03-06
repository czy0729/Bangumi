/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:40:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:42:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.sm + 4,
    paddingRight: _.wind
  },
  avatar: {
    backgroundColor: _.select(_.colorTinygrailBg, _._colorDarkModeLevel2)
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
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
