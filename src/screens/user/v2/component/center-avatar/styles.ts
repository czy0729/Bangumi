/*
 * @Author: czy0729
 * @Date: 2022-09-07 21:03:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 11:29:24
 */
import { _ } from '@stores'

export const styles = _.create({
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  status: {
    position: 'absolute',
    zIndex: 1,
    right: 1,
    bottom: 1
  },
  touch: {
    width: 18,
    height: 18,
    padding: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 18
  },
  online: {
    width: _.ios(14, 13),
    height: _.ios(14, 13),
    backgroundColor: 'rgb(9, 241, 117)',
    borderRadius: _.ios(14, 13)
  },
  edit: {
    marginLeft: _.ios(1, 0)
  }
})
