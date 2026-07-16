/*
 * @Author: czy0729
 * @Date: 2023-05-24 16:21:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:20:13
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  list: {
    minHeight: 80
  },
  loading: {
    height: IMG_HEIGHT_LG
  },
  recItem: {
    paddingRight: 20
  },
  recBadge: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: _.ios(20, 14) + _.wind - _._wind,
    opacity: 0.5
  },
  recText: {
    fontFamily: 'Avenir',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -2 + _.letterSpacing
  }
}))
