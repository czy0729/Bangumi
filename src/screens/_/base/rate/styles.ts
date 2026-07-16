/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:37:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  rate: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12 + _.wind - _._wind,
    opacity: 0.5
  },
  rateText: {
    fontFamily: 'Avenir',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -2 + _.letterSpacing
  }
}))
