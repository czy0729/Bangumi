/*
 * @Author: czy0729
 * @Date: 2022-05-03 11:07:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-05-03 11:07:19
 */
import { _ } from '@stores'

export const styles = _.create({
  default: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    width: Math.max(Number(_.window.contentWidth / 1.88), 168),
    height: 36,
    backgroundColor: '#eee',
    borderRadius: 5
  },
  disabled: {
    opacity: 0.4
  },
  slider: {
    position: 'absolute',
    top: 1,
    bottom: 1,
    right: 1,
    left: 1,
    borderRadius: 5
  }
})
