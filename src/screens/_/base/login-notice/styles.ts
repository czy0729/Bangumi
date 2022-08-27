/*
 * @Author: czy0729
 * @Date: 2022-06-13 16:44:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 01:13:24
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loginNotice: _.ios(
    {
      position: 'absolute',
      zIndex: 1001,
      right: 0,
      left: 0,
      bottom: _.tabBarHeight,
      height: 40,
      backgroundColor: _.select(
        'rgba(255, 244, 244, 0.64)',
        'rgba(255, 244, 244, 0.32)'
      )
    },
    {
      height: 40,
      backgroundColor: _.colorMainLight
    }
  ),
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
