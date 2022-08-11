/*
 * @Author: czy0729
 * @Date: 2022-08-04 18:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 02:43:21
 */
import { _ } from '@stores'

const rStyle = (top: number, left: number): object => ({
  position: 'absolute',
  zIndex: 1,
  top: _.r(top - _.xs) + _.device(0, 4),
  left: _.r(left - _.sm),
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

export const styles = _.create({
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100),
  advanceContainer: {
    paddingLeft: _.sm * 2
  },
  advance: {
    padding: 0,
    paddingLeft: 2,
    opacity: 0.8
  }
})
