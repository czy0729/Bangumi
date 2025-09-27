/*
 * @Author: czy0729
 * @Date: 2022-05-06 20:47:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 05:12:45
 */
import { _ } from '@stores'

export const styles = _.create({
  measure: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  katakana: {
    position: 'absolute',
    zIndex: 10
  }
})
