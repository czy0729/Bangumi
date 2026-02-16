/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:11:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-02 22:17:04
 */
import { _ } from '@stores'

export const styles = _.create({
  mask: {
    flex: 1,
    height: _.web('100%', undefined),
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
  },
  linear: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  press: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
