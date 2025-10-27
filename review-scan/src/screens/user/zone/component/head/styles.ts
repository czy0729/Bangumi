/*
 * @Author: czy0729
 * @Date: 2022-06-29 06:28:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 19:23:30
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
  head: {
    paddingTop: 12
  },
  l1: lStyle(16, 100),
  l2: lStyle(52, 116),
  l3: lStyle(88, 100),
  r1: rStyle(16, 100),
  r2: rStyle(52, 116),
  r3: rStyle(88, 100)
}))
