/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 00:46:36
 */
import { DEFAULT_MASK_WIDTH } from './ds'

import type { MaskWidthOptions } from './types'

/**
 * 遮罩层宽度
 *  - 若 maskWidth >= DEFAULT_MASK_WIDTH 则认为是占满横屏的组件, 需要补偿倍率宽度
 *  - wind - contentWind 为平板设备两侧预留间距, 在手机上永远为 0
 *  - Android 额外 +24 补偿滚动条与边缘间距
 */
export function getMaskWidthValue(maskWidth: number, options: MaskWidthOptions): number {
  const { isPad, wind, contentWind, padMultiplier, isIOS } = options
  return (
    maskWidth +
    (isPad && maskWidth >= DEFAULT_MASK_WIDTH ? (wind - contentWind) * (padMultiplier + 1) : 0) +
    (isIOS ? 0 : 24)
  )
}

/**
 * 遮罩渐变的 3 个颜色 (不透明 → 低 alpha 过渡 → 全透明)
 *  - 用 3 色而不是 2 色: 2 色线性插值在接近全透明时 RGB 残留会形成"脏边"断层
 *  - 入参是 RGB 原始值字符串 (如 '255, 255, 255'), 由调用方 join 得到;
 *    调用方按这个"值"做依赖, 主题切换后才会可靠地重算 (见 use-mask)
 * */
export function getMaskColors(rgb: string): [string, string, string] {
  return [`rgba(${rgb}, 1)`, `rgba(${rgb}, 0.06)`, `rgba(${rgb}, 0)`]
}
