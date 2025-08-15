/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 04:30:05
 */
import { _ } from '@stores'

export const styles = _.create({
  time: {
    width: _.r(72),
    paddingLeft: _._wind,
    marginTop: 2
  },
  transparent: {
    opacity: 0
  },
  undetermined: {
    zIndex: 1,
    paddingVertical: _.sm
  }
})
