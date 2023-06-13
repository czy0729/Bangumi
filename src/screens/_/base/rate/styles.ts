/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 03:35:59
 */
import { _ } from '@stores'

export const styles = _.create({
  rate: {
    position: 'absolute',
    zIndex: 1,
    top: _.sm,
    right: _.ios(26, 20),
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
