/*
 * @Author: czy0729
 * @Date: 2022-06-13 16:44:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-25 03:25:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loginNotice: {
    position: 'absolute',
    zIndex: 1001,
    top: 0,
    right: 0,
    left: 0,
    height: 40,
    marginTop: -40,
    backgroundColor: _.ios(
      _.select('rgba(255, 244, 244, 0.64)', 'rgba(255, 244, 244, 0.32)'),
      _.colorMainLight
    )
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  body: {
    height: 40
  },
  text: {
    paddingHorizontal: _.wind
  }
}))
