/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:14:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:45:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0
  },
  disc: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -2,
    marginRight: -6,
    backgroundColor: _.select(_.colorTitle, _.colorSub)
  }
}))
