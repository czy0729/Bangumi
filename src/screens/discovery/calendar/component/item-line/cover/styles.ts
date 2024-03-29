/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 04:36:58
 */
import { _ } from '@stores'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'

export const styles = _.create({
  inView: {
    minWidth: IMG_WIDTH,
    minHeight: IMG_HEIGHT
  }
})
