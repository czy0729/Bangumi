/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:05:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 20:37:21
 */
import { _ } from '@stores'

export const styles = _.create({
  tabBarLeft: {
    height: _.r(42),
    paddingLeft: _.r(_._wind),
    paddingRight: _.sm,
    marginTop: _.r(5),
    backgroundColor: 'transparent'
  },
  btn: {
    width: _.r(48),
    height: _.r(24),
    borderRadius: _.r(16)
  }
})
