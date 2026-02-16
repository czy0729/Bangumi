/*
 * @Author: czy0729
 * @Date: 2023-12-30 15:17:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 20:45:42
 */
import { _ } from '@stores'
import { AVATAR_SIZE } from './ds'

export const styles = _.create({
  topNavbar: {
    width: '100%',
    paddingLeft: _._wind + _.xs + AVATAR_SIZE,
    marginTop: -8
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
})
