/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:38:42
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    borderTopLeftRadius: _.r(34),
    borderBottomLeftRadius: _.r(34),
    overflow: 'hidden'
  },
  btn: {
    width: _.r(68),
    height: _.r(34),
    paddingLeft: _.r(4),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: _.r(34),
    borderBottomLeftRadius: _.r(34)
  },
  text: {
    width: _.r(68)
  }
})
