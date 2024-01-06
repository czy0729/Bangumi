/*
 * @Author: czy0729
 * @Date: 2022-10-25 14:44:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-25 14:44:48
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    marginLeft: _.device(0, 4),
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    width: 34,
    height: 34
  },
  icon: {
    marginBottom: -1
  }
})
