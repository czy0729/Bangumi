/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 21:25:00
 */
import { useCallback, useEffect, useState } from 'react'
import { getCoverBlurLayout, isBlurAvailable } from './utils'

import type { UseCoverBlurOptions } from './types'

/**
 * 封面底部氛围色场的状态
 *  - 三层高度计算与兜底判定在 utils (纯逻辑, 可单测), 这里只做状态
 *  - blurUri 为 null 表示需要回落到历史纯黑渐变 (无封面 / 非远端地址 / 加载失败)
 * */
export function useCoverBlur({ src, blurSrc, height, blurHeight, scrimHeight }: UseCoverBlurOptions) {
  const [error, setError] = useState(false)

  const handleError = useCallback(() => setError(true), [])

  // 列表复用: 地址变化后重置失败标记, 否则同一实例会永久走兜底
  useEffect(() => {
    setError(false)
  }, [src, blurSrc])

  return {
    /** 可用的缩略图地址, null 表示走兜底 */
    blurUri: isBlurAvailable(src, blurSrc, error) ? blurSrc : null,

    /** 图片加载失败回调 (交给 RNImage) */
    handleError,

    /** 三层高度 */
    layout: getCoverBlurLayout({ height, blurHeight, scrimHeight })
  }
}
