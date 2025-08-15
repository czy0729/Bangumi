/*
 * @Author: czy0729
 * @Date: 2022-06-02 06:03:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-03 12:44:24
 */
import { _ } from '@stores'

export const styles = _.create({
  preventTouchPlaceholder: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    bottom: 0,
    width: _._wind
  }
})
