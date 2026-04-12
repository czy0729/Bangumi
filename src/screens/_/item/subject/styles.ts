/*
 * @Author: czy0729
 * @Date: 2023-11-03 03:41:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 22:27:35
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  placeholder: {
    height: IMG_HEIGHT_LG
  },
  active: {
    backgroundColor: _.colorMainLight
  },
  rate: {
    top: undefined,
    right: 0,
    bottom: -20,
    left: 0
  },
  rateText: {
    fontSize: 18
  }
}))
