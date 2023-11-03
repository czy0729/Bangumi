/*
 * @Author: czy0729
 * @Date: 2023-05-24 16:21:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 16:30:03
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const styles = _.create({
  list: {
    minHeight: 80
  },
  loading: {
    height: IMG_HEIGHT_LG
  },
  placeholder: {
    height: IMG_HEIGHT_LG
  },
  active: {
    backgroundColor: _.colorMainLight
  }
})
