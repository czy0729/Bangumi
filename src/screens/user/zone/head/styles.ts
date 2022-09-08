/*
 * @Author: czy0729
 * @Date: 2022-06-29 06:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-08 19:00:36
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
  opacity: 0.92
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
  opacity: 0.92
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
    opacity: 0.92
  },
  l1: lStyle(16, 100),
  l2: lStyle(52, 116),
  l3: lStyle(88, 100),
  r0: {
    position: 'absolute',
    zIndex: 1,
    top: 140,
    right: _.wind,
    opacity: 0.92
  },
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100),
  friend: {
    opacity: 0.92
  },
  status: {
    position: 'absolute',
    zIndex: 1,
    right: 1,
    bottom: 1,
    width: 18,
    height: 18,
    padding: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 9
  },
  online: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  onlineSuccess: {
    backgroundColor: 'rgb(9, 241, 117)'
  },
  onlineWarning: {
    backgroundColor: _.colorWarning
  }
}))
