/*
 * @Author: czy0729
 * @Date: 2023-03-11 11:25:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-11 11:25:52
 */
import { _ } from '@stores'

export const styles = _.create({
  close: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 0,
    marginTop: -16,
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 32,
    height: 32
  }
})
