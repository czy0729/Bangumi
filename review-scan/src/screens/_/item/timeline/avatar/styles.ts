/*
 * @Author: czy0729
 * @Date: 2022-11-11 19:36:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 19:36:36
 */
import { _ } from '@stores'
import { AVATAR_WIDTH } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    width: _.r(AVATAR_WIDTH),
    marginTop: _.r(18),
    marginLeft: _.wind
  }
}))
