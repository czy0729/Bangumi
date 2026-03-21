/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:31:56
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from '../../../../ds'

export const styles = _.create({
  inView: {
    minWidth: COVER_WIDTH,
    minHeight: COVER_HEIGHT
  }
})
