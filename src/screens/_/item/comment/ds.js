/*
 * @Author: czy0729
 * @Date: 2021-08-10 19:54:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 19:59:31
 */
import { _ } from '@stores'
import { EVENT } from '@constants'

export const defaultProps = {
  // stores
  styles: {},
  flat: _.flat,

  // props
  style: {},
  navigation: {},
  index: 0,
  time: '',
  avatar: '',
  userId: '',
  userName: '',
  star: '',
  comment: '',
  event: EVENT
}
