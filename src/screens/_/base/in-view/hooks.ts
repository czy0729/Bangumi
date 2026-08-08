/*
 * @Author: czy0729
 * @Date: 2026-08-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { preDistance } from './ds'

import type { LayoutChangeEvent } from 'react-native'
import type { UseInViewParams } from './types'

/** InView 懒渲染判定：测量自身坐标 + 滚动阈值判断 */
export function useInView({ y, visibleBottom, onShow, onLayout }: UseInViewParams) {
  // 是否直接使用传入的 y 坐标, 否则等待 onLayout 测量
  const hasY = typeof y === 'number'

  // 判定用的 y 坐标: hasY 时固定为传入的 y, 否则等 onLayout 测量自身位置
  const [currentY, setCurrentY] = useState<number | undefined>(hasY ? y : undefined)

  // 通过 ref 读取最新的 onLayout, 保证 handleLayout 引用稳定, 避免不必要的重渲染
  const onLayoutRef = useRef(onLayout)
  useEffect(() => {
    onLayoutRef.current = onLayout
  }, [onLayout])

  // 无 y 时测量自身相对于父容器的坐标, 同时透传外部 onLayout
  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    onLayoutRef.current?.(event)
    setCurrentY(event.nativeEvent.layout.y)
  }, [])

  useEffect(() => {
    // 已展示后父层不再传入 visibleBottom, 无需再判断
    if (visibleBottom === undefined) return

    // 通常 key 是 subjectId, 而 y 是通过 height * index 得到的, 后续重渲染 y 可能变小,
    // 记录较小的 y 避免漏判
    if (hasY && y < currentY) setCurrentY(y)

    // 计算有效的 y 值（取较小的）, 判断是否进入提前渲染区域
    const effectiveY: number | undefined = hasY && y < currentY ? y : currentY
    if (typeof effectiveY === 'number' && visibleBottom + preDistance >= effectiveY) onShow()
  }, [hasY, y, currentY, visibleBottom, onShow])

  return {
    currentY,
    handleLayout
  }
}
