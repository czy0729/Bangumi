/*
 * @Author: czy0729
 * @Date: 2023-11-03 03:41:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-03 03:41:52
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  placeholder: {
    height: IMG_HEIGHT_LG
  },
  active: {
    backgroundColor: _.colorMainLight
  }
}))
