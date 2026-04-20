/*
 * @Author: czy0729
 * @Date: 2023-06-10 23:47:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-13 08:10:17
 */
import { _ } from '@stores'

export const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  share: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: _._wind - 6
  }
})
