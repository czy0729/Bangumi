/*
 * @Author: czy0729
 * @Date: 2023-12-29 19:33:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:50:22
 */
import { Props } from './types'

export function LazyLoadView({ current, index, distance, children }: Props) {
  if (!isActive(current, index, distance)) return null

  return children
}

function isActive(current: number, index: number, distance: number = 1) {
  return current === index || current - distance === index || current + distance === index
}

export default LazyLoadView
