/*
 * @Author: czy0729
 * @Date: 2022-11-09 07:07:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 05:45:10
 */
import { _ } from '@stores'

export const styles = _.create({
  disabled: {
    opacity: 0.1
  },
  hover: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: _.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
})
