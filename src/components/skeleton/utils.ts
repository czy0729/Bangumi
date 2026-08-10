/*
 * @Author: czy0729
 * @Date: 2024-03-06 12:59:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 00:20:56
 */
import { _ } from '@stores'
import { _colorTinygrailBorder, _colorTinygrailIcon } from '@styles/colors'

import type { ShimmerColorPalette } from './types'

/** 渐变颜色缓存, 保证主题未变化时返回稳定引用 */
const shimmerColorsCache = new Map<string, [string, string, string]>()

/** 依据类型与深浅色模式返回骨架屏渐变颜色 (纯, 供单测) */
export function getShimmerColorsByMode(
  type: 'tinygrail' | 'app',
  isDark: boolean,
  colors: ShimmerColorPalette
): [string, string, string] {
  if (!isDark) {
    return [colors.colorBg, colors.colorIcon, colors.colorBg]
  }

  return type === 'tinygrail'
    ? [_colorTinygrailBorder, _colorTinygrailIcon, _colorTinygrailBorder]
    : [colors.darkLevel1, colors.darkLevel2, colors.darkLevel1]
}

/** 获取骨架屏渐变颜色 (响应式, 随主题更新, 内容不变时复用缓存引用) */
export function getShimmerColors(type: 'tinygrail' | 'app' = 'app'): [string, string, string] {
  const colors = getShimmerColorsByMode(type, _.isDark, {
    colorBg: _.colorBg,
    colorIcon: _.colorIcon,
    darkLevel1: _._colorDarkModeLevel1,
    darkLevel2: _._colorDarkModeLevel2
  })

  const key = `${type}-${_.isDark}`
  const cached = shimmerColorsCache.get(key)
  if (cached && cached[0] === colors[0] && cached[1] === colors[1] && cached[2] === colors[2]) {
    return cached
  }

  shimmerColorsCache.set(key, colors)
  return colors
}

/** 获取骨架屏背景色 */
export function getSkeletonColor(type?: 'tinygrail' | 'app'): string {
  return getShimmerColors(type)[0]
}
