/*
 * @Author: czy0729
 * @Date: 2024-05-03 23:08:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-14 06:34:31
 */
import { _ } from '@stores'

export const styles = _.create({
  item: {
    paddingVertical: 12
  },
  value: {
    marginTop: -8,
    marginRight: 0,
    marginLeft: 40
  },
  reverse: {
    marginTop: 4,
    transform: [
      {
        rotate: '180deg'
      }
    ]
  }
})
