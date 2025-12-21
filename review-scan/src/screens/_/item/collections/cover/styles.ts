/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:37:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:02:32
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'

export const styles = _.create({
  inView: {
    minWidth: COVER_WIDTH,
    minHeight: COVER_HEIGHT
  }
})
