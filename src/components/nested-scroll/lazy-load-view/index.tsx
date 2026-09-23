/*
 * @Author: czy0729
 * @Date: 2023-12-29 19:33:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 */
import type { Props } from './types'

export function LazyLoadView({ current, index, distance, range, placeholder, children }: Props) {
  if (!isActive(current, index, distance, range)) return <>{placeholder ?? null}</>

  return <>{children}</>
}

function isActive(
  current: number,
  index: number,
  distance: number = 1,
  range?: readonly [number, number]
) {
  if (range) return index >= range[0] && index <= range[1]

  return Math.abs(current - index) <= distance
}

export default LazyLoadView
