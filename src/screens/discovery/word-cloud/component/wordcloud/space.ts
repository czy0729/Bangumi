/*
 * @Author: czy0729
 * @Date: 2026-08-06 08:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-06 09:02:23
 */
import type { Space } from './types'

/** 创建词云剩余空间 */
export function createSpace(
  spaceType: Space['spaceType'],
  width: number,
  height: number,
  x: number,
  y: number
): Space {
  return {
    spaceType,
    width,
    height,
    x,
    y
  }
}
