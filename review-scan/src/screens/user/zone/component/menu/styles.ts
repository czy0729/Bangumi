/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:43:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:06:22
 */
import { _ } from '@stores'

export const styles = _.create({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  right: {
    zIndex: 1,
    marginTop: _.platforms(-6, -6, -6, 0)
  }
})
