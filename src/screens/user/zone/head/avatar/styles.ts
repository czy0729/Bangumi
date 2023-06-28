/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:48:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 08:48:50
 */
import { _ } from '@stores'

export const styles = _.create({
  avatar: {
    marginTop: 14,
    backgroundColor: _.__colorPlain__,
    overflow: 'hidden'
  },
  status: {
    position: 'absolute',
    zIndex: 1,
    right: 1,
    bottom: 1,
    width: 18,
    height: 18,
    padding: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 18
  },
  online: {
    width: 13,
    height: 13,
    borderRadius: 13
  }
})
