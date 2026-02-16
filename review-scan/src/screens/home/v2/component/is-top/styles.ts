/*
 * @Author: czy0729
 * @Date: 2024-01-20 09:18:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-20 09:18:31
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  top: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0
  },
  touch: {
    width: 32,
    height: 32,
    paddingTop: 6,
    paddingLeft: 17
  },
  angle: {
    borderWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: _.colorIcon,
    transform: [
      {
        rotate: '-45deg'
      }
    ],
    opacity: 0.8
  }
}))
