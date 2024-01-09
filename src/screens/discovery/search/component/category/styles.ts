/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:03:54
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden'
  },
  btn: {
    width: _.r(68),
    height: 40,
    paddingLeft: _.r(4),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40
  },
  text: {
    width: _.r(68)
  }
})
