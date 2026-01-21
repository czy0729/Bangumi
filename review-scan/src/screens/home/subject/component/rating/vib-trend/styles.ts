/*
 * @Author: czy0729
 * @Date: 2025-02-14 08:35:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 13:47:31
 */
import { _ } from '@stores'

export const styles = _.create({
  label: {
    width: '52%'
  },
  value: {
    width: '24%'
  },
  reverse: {
    marginTop: _.ios(4, -1),
    transform: [
      {
        rotate: '180deg'
      }
    ]
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 8,
    marginTop: -40
  }
})
