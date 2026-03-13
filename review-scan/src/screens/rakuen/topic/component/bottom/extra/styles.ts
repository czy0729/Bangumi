/*
 * @Author: czy0729
 * @Date: 2023-05-19 10:37:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-29 04:23:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.ios(36, 'auto')
  return {
    left: {
      position: 'absolute',
      zIndex: 1002,
      left: 0,
      bottom: 0,
      height,
      paddingRight: _.md
    },
    center: {
      position: 'absolute',
      zIndex: 1001,
      left: _.window.width / 3,
      bottom: 0,
      height
    },
    right: {
      position: 'absolute',
      zIndex: 1002,
      right: 0,
      bottom: 0,
      height
    },
    btn: {
      width: _.window.width / 3,
      height: 48
    }
  }
})
