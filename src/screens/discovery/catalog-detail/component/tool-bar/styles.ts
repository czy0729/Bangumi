/*
 * @Author: czy0729
 * @Date: 2022-08-26 15:36:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-25 02:45:15
 */
import { _ } from '@stores'

export const styles = _.create({
  btn: {
    width: 76,
    height: 30,
    marginHorizontal: 4,
    borderRadius: 30
  },
  forward: {
    transform: [
      {
        rotate: '90deg'
      }
    ]
  },
  reverse: {
    transform: [
      {
        rotate: '-90deg'
      }
    ]
  }
})
