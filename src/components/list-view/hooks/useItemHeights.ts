/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 00:00:00
 */
import { useCallback, useRef } from 'react'
import { buildOffsets, getItemLayout as calcItemLayout } from '../list/utils'

import type { MutableRefObject } from 'react'

/**
 * 列表条目高度缓存
 * - heights 按 data 顺序平行存储，onLayout 测量后写回（不触发重渲染），无效的 0 高度测量会被丢弃
 * - offsets 为高度前缀和缓存，测量写回或数据变化时标记脏，下次查询惰性重建一次，
 *   使 getItemLayout 单次调用为 O(1)（FlatList 滚动期间高频调用）
 * - 提供 getItemLayout，供 FlatList 在挂载期直接读取真实/预估高度，减少测量开销
 * - resetKey 变化时重建缓存（如切换到不同实体），同实体分页（key 不变）保留已测量高度
 * - headerOffsetRef 实时读取 ListHeaderComponent 高度，补偿条目偏移
 * - enabled 为 false 时不构建缓存数组，避免全 App 列表白费分配
 */
export function useItemHeights(
  enabled: boolean,
  dataLength: number,
  estimate: number,
  resetKey?: string | number,
  headerOffsetRef?: MutableRefObject<number>
) {
  const heights = useRef<number[]>([])
  const offsets = useRef<number[]>([])
  const dirty = useRef(true)
  const lastResetKey = useRef<string | number | undefined>(undefined)

  // render 期间直接写 ref，以下两段逻辑幂等（重复执行结果一致），并发双渲染安全
  // resetKey 变化时整体重建为预估高度（切换实体 / 头部刷新整批替换数据）
  if (enabled && resetKey !== lastResetKey.current) {
    lastResetKey.current = resetKey
    heights.current = new Array<number>(dataLength).fill(estimate)
    offsets.current = []
    dirty.current = true
  }

  // 数据长度变化时同步数组，尽量保留已测量的高度
  if (enabled && heights.current.length !== dataLength) {
    const next: number[] = new Array<number>(dataLength).fill(estimate)
    const keep = Math.min(dataLength, heights.current.length)
    for (let i = 0; i < keep; i += 1) {
      next[i] = heights.current[i] ?? estimate
    }
    heights.current = next
    dirty.current = true
  }

  const setHeight = useCallback(
    (index: number, height: number) => {
      // 0 高度是无效测量（如 iOS 未激活 Tab 渲染 null 的空 cell），丢弃以免污染缓存
      if (!enabled || height <= 0) return
      if (index >= 0 && index < heights.current.length) {
        if (heights.current[index] !== height) {
          heights.current[index] = height
          dirty.current = true
        }
      }
    },
    [enabled]
  )

  const getItemLayout = useCallback(
    (_data: unknown, index: number) => {
      if (dirty.current || offsets.current.length < heights.current.length) {
        offsets.current = buildOffsets(heights.current, estimate, heights.current.length)
        dirty.current = false
      }
      return calcItemLayout(
        heights.current,
        estimate,
        index,
        headerOffsetRef?.current ?? 0,
        offsets.current
      )
    },
    [estimate, headerOffsetRef]
  )

  return { setHeight, getItemLayout }
}
