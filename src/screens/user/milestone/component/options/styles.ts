/*
 * @Author: czy0729
 * @Date: 2024-10-12 15:42:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:42:14
 */
import { _ } from '@stores'

export const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: 0.8
      }
    ]
  },
  segmentedControl: {
    height: 32
  },
  theme: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    left: _._wind - 6
  },
  share: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: _._wind - 6
  }
})
