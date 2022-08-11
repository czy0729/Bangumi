/*
 * @Author: czy0729
 * @Date: 2022-06-29 06:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 13:14:17
 */
import { _ } from '@stores'

const lStyle = (top: number, right: number): object => ({
  position: 'absolute',
  zIndex: 1,
  top: _.r(top - _.xs),
  right: _.r(right - _.sm),
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

const rStyle = (top: number, left: number): object => ({
  position: 'absolute',
  zIndex: 1,
  top: _.r(top - _.xs),
  left: _.r(left - _.sm),
  paddingVertical: _.xs,
  paddingHorizontal: _.sm,
  borderRadius: _.radiusSm,
  overflow: 'hidden',
  opacity: 0.8
})

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    marginTop: 14,
    backgroundColor: _.__colorPlain__,
    overflow: 'hidden'
  },
  icons: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: -54,
    width: 48,
    height: 18
  },
  icon: {
    paddingHorizontal: 6,
    opacity: 0.64
  },
  l1: lStyle(16, 100),
  l2: lStyle(52, 116),
  l3: lStyle(88, 100),
  r0: {
    position: 'absolute',
    zIndex: 1,
    top: 140,
    right: _.wind,
    opacity: 0.88
  },
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100),
  friend: {
    opacity: 0.88
  }
}))
