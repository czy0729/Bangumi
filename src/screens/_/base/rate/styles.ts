/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-10 14:24:38
 */
import { _ } from '@stores'

export const styles = _.create({
  rate: {
    position: 'absolute',
    zIndex: 1,
    top: 8,
    right: _.ios(20, 14),
    opacity: 0.5
  },
  rateText: {
    fontFamily: 'Avenir',
    fontStyle: 'italic',
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -2
  }
})
