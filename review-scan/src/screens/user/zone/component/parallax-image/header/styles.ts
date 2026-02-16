/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:38:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:39:47
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../../store'

export const styles = _.create({
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -2,
    left: 0
  },
  title: {
    position: 'absolute',
    left: _.wind + 32,
    bottom: H_RADIUS_LINE + 15
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
})
