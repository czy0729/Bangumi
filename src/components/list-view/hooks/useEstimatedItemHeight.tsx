/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 14:30:00
 */
import React, { useCallback, useMemo, useRef, useState } from 'react'
import CellRenderer from '../cell-renderer'
import HeaderMeasure from '../header-measure'
import { useItemHeights } from './useItemHeights'

import type { UseEstimatedItemHeightOptions } from './types'

/**
 * estimatedItemHeight 的全部实现
 * - HeaderMeasure 测量 ListHeaderComponent 高度补偿 getItemLayout 偏移
 * - header 测量完成前不启用 getItemLayout，避免偏移从 0 突变导致滚动跳动
 * - header 出现 / 消失时重置测量状态与偏移
 * - CellRenderer 测量真实高度写回缓存，开发环境叠加调试层
 * - enabled 时返回 { getItemLayout, CellRendererComponent, ListHeaderComponent }
 * - 未启用时仅原样透传 header，不影响其他列表
 * - header 须为稳定引用（见 UseEstimatedItemHeightOptions）；
 *   组件引用需显式建元素后传入（ComponentType 不是合法的 ReactNode 子节点）
 */
export function useEstimatedItemHeight(options: UseEstimatedItemHeightOptions) {
  const { enabled, dataLength, estimate, resetKey, header } = options
  const headerOffset = useRef(0)

  const { setHeight, getItemLayout } = useItemHeights(
    enabled,
    dataLength,
    estimate,
    resetKey,
    headerOffset
  )

  const CellRendererComponent = useMemo(
    () => CellRenderer({ setHeight, estimate }),
    [setHeight, estimate]
  )

  // 无 header 时无需等待测量；有 header 时等首次 onLayout 再启用 getItemLayout
  const shouldWaitHeader = enabled && !!header
  const [headerMeasured, setHeaderMeasured] = useState(!shouldWaitHeader)

  // header 出现 / 消失时重置测量状态与偏移，避免用过期的 offset 启用 getItemLayout 导致滚动跳动；
  // 仅在布尔值翻转时执行，元素引用每次渲染变化不会触发
  const prevShouldWaitHeader = useRef(shouldWaitHeader)
  if (prevShouldWaitHeader.current !== shouldWaitHeader) {
    prevShouldWaitHeader.current = shouldWaitHeader
    headerOffset.current = 0
    setHeaderMeasured(!shouldWaitHeader)
  }

  const onHeaderMeasure = useCallback((height: number) => {
    headerOffset.current = height
    setHeaderMeasured(true)
  }, [])

  const ListHeaderComponent = useMemo(() => {
    if (!enabled || !header) {
      return header
    }
    const headerChild = typeof header === 'function' ? React.createElement(header) : header
    return <HeaderMeasure onMeasure={onHeaderMeasure}>{headerChild}</HeaderMeasure>
  }, [enabled, header, onHeaderMeasure])

  return {
    ListHeaderComponent,
    ...(enabled ? { CellRendererComponent } : {}),
    ...(enabled && headerMeasured ? { getItemLayout } : {})
  }
}
