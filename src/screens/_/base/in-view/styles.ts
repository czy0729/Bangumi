/*
 * @Author: czy0729
 * @Date: 2024-11-29 09:40:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 09:52:26
 */
import { _ } from '@stores'

export const styles = _.create({
  dev: {
    position: 'absolute',
    zIndex: 100,
    right: 0,
    top: 0,
    left: 0,
    pointerEvents: 'none'
  },
  devText: {
    padding: 2,
    backgroundColor: _.colorDepthBid
  }
})
