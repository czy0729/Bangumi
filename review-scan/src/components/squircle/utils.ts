/*
 * @Doc: https://github.com/pie6k/react-ios-corners/blob/master/src/index.tsx
 * @Author: czy0729
 * @Date: 2023-12-09 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-25 03:01:58
 */
import { _ } from '@stores'
import { WEB } from '@constants'
import { getMaskPathInput } from './types'

const cacheMap = new Map<string, any>()

/** iOS 圆角轨迹参数 */
const iOS_PREST = {
  r1: 0.0586,
  r2: 0.332
} as const

const MIN_RADIUS = _.web(6, 8)

const MAX_RADIUS = _.web(36, 40)

const DEFAULT_RATIO = iOS_PREST.r1 / iOS_PREST.r2

export const DEFAULT_ROUNDNESS = 0.176

export const ROUND_ROUNDNESS = 0.35

/** 获取 iOS 圆角轨迹遮罩 svg */
export function getMaskPath(input: getMaskPathInput) {
  const id = `getMaskPath|${JSON.stringify(input)}`
  if (cacheMap.has(id)) return cacheMap.get(id)

  const { width, height } = input

  const maxBorderRadius = Math.min(width, height) / 2
  const { radius = maxBorderRadius } = input
  let { roundness = DEFAULT_RATIO } = input

  if (width === height && radius >= Math.max(width, height)) {
    roundness = ROUND_ROUNDNESS
  }

  const numberRadius = typeof radius === 'string' ? maxBorderRadius : radius
  const finalBorderRadius = Math.min(numberRadius, maxBorderRadius)
  return getSquirclePath(width, height, finalBorderRadius * roundness, finalBorderRadius)
}

/** 获取 iOS 圆角轨迹参数 */
export function getSquirclePath(
  w: number,
  h: number,
  r1: number = iOS_PREST.r1,
  r2: number = iOS_PREST.r2
) {
  const id = `getSquirclePath|${w}|${h}|${r1}|${r2}`
  if (cacheMap.has(id)) return cacheMap.get(id)

  r1 = Math.min(r1, r2)
  return `
    M 0,${r2}
    C 0,${r1} ${r1},0 ${r2},0
    L ${w - r2},0
    C ${w - r1},0 ${w},${r1} ${w},${r2}
    L ${w},${h - r2}
    C ${w},${h - r1} ${w - r1},${h} ${w - r2},${h}
    L ${r2},${h}
    C ${r1},${h} 0,${h - r1} 0,${h - r2}
    L 0,${r2}
  `
    .trim()
    .replace(/\n/g, ' ')
}

/** 自动计算适合比例的圆角大小 */
export function getRadius(size: number, radius?: number | boolean) {
  const id = `getRadius|${size}|${radius}`
  if (cacheMap.has(id)) return cacheMap.get(id)

  // 若长和高一样, radius 大于等于长和高, 认为是圆
  if (size && radius && Number(radius) >= size) {
    cacheMap.set(id, radius)
    return radius as number
  }

  let value: number
  if (!radius || typeof radius === 'boolean') {
    if (size >= 80) {
      value = _.radiusMd
    } else if (size >= 40) {
      value = _.radiusSm
    } else {
      value = MIN_RADIUS
    }
  }

  if (!size) {
    const borderRadius = value || MIN_RADIUS
    cacheMap.set(id, borderRadius)
    return borderRadius
  }

  let ratio: number
  if (value >= _.radiusLg) {
    ratio = 0.24
  } else if (value >= _.radiusMd) {
    ratio = 0.2
  } else if (value >= _.radiusSm) {
    ratio = 0.16
  } else {
    ratio = 0.12
  }
  if (WEB) ratio += 0.08

  const borderRadius = Math.min(
    Math.max(Math.floor(size * ratio), size <= 28 ? MIN_RADIUS : MIN_RADIUS * 2),
    MAX_RADIUS
  )
  cacheMap.set(id, borderRadius)
  return borderRadius
}

/** 自动计算适合比例的圆角比例 */
export function getRoundness(size: number, radius?: number | boolean) {
  // 若长和高一样, radius 大于等于长和高, 认为是圆
  if (size && radius && Number(radius) >= size) return ROUND_ROUNDNESS

  return DEFAULT_ROUNDNESS
}
