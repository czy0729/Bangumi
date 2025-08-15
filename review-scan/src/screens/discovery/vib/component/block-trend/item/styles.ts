/*
 * @Author: czy0729
 * @Date: 2024-05-03 23:08:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 09:55:22
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
    marginTop: _.ios(4, -1),
    transform: [
      {
        rotate: '180deg'
      }
    ]
  }
})
