/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:27
 */
import { AMBIENT_SPREAD_RATIO, BLUR_HEIGHT_RATIO } from './ds'

import type { CoverBlurLayout, LayoutOptions, Props } from './types'

/**
 * 计算色场 / 黑罩 / 氛围层三层高度
 *  - 色场: 优先用调用方传入值, 否则按卡片高度比例取
 *  - 黑罩: 未指定时与色场同高 (需要沿用历史观感的卡片会自行传值)
 *  - 氛围层: 必须盖过色场与黑罩中更高的那个, 否则小卡上会被黑罩压住而看不到
 * */
export function getCoverBlurLayout({
  height,
  blurHeight,
  scrimHeight,
  blurRatio = BLUR_HEIGHT_RATIO,
  ambientSpreadRatio = AMBIENT_SPREAD_RATIO
}: LayoutOptions): CoverBlurLayout {
  const blur = blurHeight || Math.round(height * blurRatio)
  const scrim = scrimHeight || blur
  const ambient = Math.max(blur, scrim) + Math.round(height * ambientSpreadRatio)

  return { blur, scrim, ambient }
}

/**
 * 是否可以使用色场
 *  - 无封面, 或缩略图地址不是远端字符串 (本地 require 图), 或图片加载失败时都要回落到历史纯黑渐变
 *  - 作为类型守卫, 命中时把 blurSrc 收窄为 string
 * */
export function isBlurAvailable(
  src: Props['src'],
  blurSrc: Props['src'],
  error: boolean
): blurSrc is string {
  return !!src && typeof blurSrc === 'string' && !error
}

