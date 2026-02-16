/*
 * @Author: czy0729
 * @Date: 2022-07-17 02:07:25
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-17 02:07:25
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    marginRight: _.device(10, _.sm),
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
