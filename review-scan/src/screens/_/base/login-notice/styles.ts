/*
 * @Author: czy0729
 * @Date: 2022-06-13 16:44:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 14:13:36
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  loginNotice: {
    position: 'absolute',
    zIndex: 10001,
    right: 0,
    left: 0,
    height: 48,
    backgroundColor: _.select('rgba(255, 244, 244, 0.64)', 'rgba(0, 0, 0, 0.12)'),
    overflow: 'hidden'
  },
  blurView: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  body: {
    height: 48,
    paddingRight: _.wind - _.sm - 1,
    paddingLeft: _.wind
  }
}))
