/*
 * @Author: czy0729
 * @Date: 2022-11-08 16:31:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:47:20
 */
import { _ } from '@stores'
import { IMAGE_WIDTH } from '../../ds'

export const memoStyles = _.memoStyles(() => ({
  memo: {
    paddingRight: _.wind,
    paddingLeft: _.wind + IMAGE_WIDTH + _.md,
    paddingBottom: _.md
  }
}))
