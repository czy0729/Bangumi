/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
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
