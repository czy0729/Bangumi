/*
 * @Author: czy0729
 * @Date: 2022-10-25 14:57:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-25 14:57:45
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    marginRight: 4,
    borderRadius: 20,
    overflow: 'hidden'
  },
  btn: {
    height: 34,
    paddingHorizontal: _.device(_.sm, _.md)
  },
  next: {
    paddingLeft: _.sm,
    paddingRight: 2
  },
  icon: {
    marginTop: 2
  },
  text: {
    marginBottom: -2,
    marginLeft: _.xs
  }
})
