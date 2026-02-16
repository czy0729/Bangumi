/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-29 10:53:05
 */
import { _ } from '@stores'
import { COVER_HEIGHT, COVER_WIDTH } from '../ds'

export const styles = _.create({
  inView: {
    minWidth: COVER_WIDTH,
    minHeight: COVER_HEIGHT
  }
})
