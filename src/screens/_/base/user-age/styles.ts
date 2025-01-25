/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:04:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 15:05:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  userAge: {
    minWidth: 40,
    marginRight: 8,
    marginLeft: 5,
    opacity: 0.8
  },
  text: {
    paddingTop: 1,
    paddingHorizontal: 5,
    color: _.__colorPlain__,
    letterSpacing: 1,
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    backgroundColor: _.select('#ffc107', _._colorDarkModeLevel2),
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
