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
    top: _.r(4),
    right: _.r(-2),
    borderWidth: _.r(8),
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
