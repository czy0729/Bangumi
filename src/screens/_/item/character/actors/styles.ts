/*
 * @Author: czy0729
 * @Date: 2024-08-24 13:09:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-24 13:11:53
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    minWidth: 128,
    marginTop: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  inView: {
    minWidth: _.r(32),
    minHeight: _.r(32)
  }
})
