/*
 * @Author: czy0729
 * @Date: 2022-06-13 16:44:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 08:15:22
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
    paddingHorizontal: _.wind
  }
}))
