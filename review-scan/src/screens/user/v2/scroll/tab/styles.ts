/*
 * @Author: czy0729
 * @Date: 2022-08-05 06:32:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-19 16:38:59
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../ds'

export const styles = _.create({
  tabBarWrap: {
    position: 'absolute',
    zIndex: 2,
    top: -H_RADIUS_LINE + 2,
    right: 0,
    left: 0
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 100,
    left: 0,
    marginTop: 0
  }
})
