/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:31:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:33:37
 */
import { _ } from '@stores'
import { MASK_BACKGROUND_COLOR, MASK_TEXT_COLOR } from './utils'

export const styles = _.create({
  blockText: {
    color: MASK_BACKGROUND_COLOR,
    backgroundColor: MASK_BACKGROUND_COLOR
  },
  blockTextShow: {
    color: MASK_TEXT_COLOR,
    backgroundColor: MASK_BACKGROUND_COLOR
  }
})
