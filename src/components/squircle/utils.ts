/*
 * @Author: czy0729
 * @Date: 2023-12-09 14:31:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:20:20
 *
 * https://github.com/pie6k/react-ios-corners/blob/master/src/index.tsx
 */
import { _ } from '@stores'
import { ensureCacheLimit } from '@utils/cache'
import { WEB } from '@constants'

import type { getMaskPathInput, SquircleShape, SquircleShapeInput } from './types'

/** 圆角轨迹 / 半径缓存上限 (key 含具体尺寸, 不加界会随不同尺寸组合增长) */
const CACHE_LIMIT = 500

const pathCache = new Map<string, string>()
const radiusCache = new Map<string, number>()

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
export function getMaskPath(input: getMaskPathInput): string {
  const id = `getMaskPath|${JSON.stringify(input)}`
  if (pathCache.has(id)) return pathCache.get(id)!

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
): string {
  const id = `getSquirclePath|${w}|${h}|${r1}|${r2}`
  if (pathCache.has(id)) return pathCache.get(id)!

  r1 = Math.min(r1, r2)
  const path = `
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
  pathCache.set(id, path)
  ensureCacheLimit(pathCache, CACHE_LIMIT)

  return path
}

/**
 * 按尺寸取档位基础圆角
 *  - 这段阈值原本在 getRadius 与 radius 组件的降级实现里各写了一份, 收敛到这里
 *  - 小于 40 时返回调用方给的 small: getRadius 传 MIN_RADIUS, Radius 降级实现传 _.radiusXs,
 *    两边取值与拆分前一致, 视觉不变
 * */
export function getTierRadius(size: number, small: number): number {
  if (size >= 80) return _.radiusMd
  if (size >= 40) return _.radiusSm
  return small
}

/** 自动计算适合比例的圆角大小 */
export function getRadius(size: number, radius?: number | boolean): number {
  const id = `getRadius|${size}|${radius}`
  if (radiusCache.has(id)) return radiusCache.get(id)!

  // 若长和高一样, radius 大于等于长和高, 认为是圆
  // Number(): radius 可能是 true, 这里必须转成数值再返回, 否则布尔值会一路传到原生的 float 属性
  if (size && radius && Number(radius) >= size) {
    const borderRadius = Number(radius)
    radiusCache.set(id, borderRadius)
    ensureCacheLimit(radiusCache, CACHE_LIMIT)
    return borderRadius
  }

  let value: number
  if (!radius || typeof radius === 'boolean') {
    value = getTierRadius(size, MIN_RADIUS)
  } else {
    value = radius
  }

  if (!size) {
    const borderRadius = value || MIN_RADIUS
    radiusCache.set(id, borderRadius)
    ensureCacheLimit(radiusCache, CACHE_LIMIT)
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
  radiusCache.set(id, borderRadius)
  ensureCacheLimit(radiusCache, CACHE_LIMIT)

  return borderRadius
}

/** 自动计算适合比例的圆角比例 */
export function getRoundness(size: number, radius?: number | boolean) {
  // 若长和高一样, radius 大于等于长和高, 认为是圆
  if (size && radius && Number(radius) >= size) return ROUND_ROUNDNESS

  return DEFAULT_ROUNDNESS
}

/**
 * 超椭圆形状参数 (宽高入参 + 圆角档位 → 圆形尺寸 / 圆角 / 圆润度)
 *  - 供两个平台入口共用, 保证 iOS 的 SVG 遮罩与安卓的原生视图是同一条曲线
 *  - size 取宽高里有效的一个, 顺带统一了此前 iOS 用 width、安卓用 width || height 的不一致
 * */
export function getSquircleShape({ width, height, radius }: SquircleShapeInput): SquircleShape {
  const size = width || height

  return {
    size,
    radius: getRadius(size, radius),
    roundness: getRoundness(size, radius)
  }
}
