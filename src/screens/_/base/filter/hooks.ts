/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:30:00
 *
 * 筛选条件计数: 数据就绪后对当前查询做一次分面扫描 (毫秒级, 同步, 带结果强缓存)
 */
import { useMemo, useRef } from 'react'

import type { Counts } from './types'

/**
 * 当前查询下的各维候选条件计数
 *  - 数据未就绪 / 频道未声明计数器 / 扫描异常时返回 null, 展示层回落 FilterItem.nums 静态分布
 *  - store 对 query 为原地逐键合并 (引用不变), 依赖须用内容指纹而非对象引用
 */
export function useOptionCounts({
  query,
  counts,
  ready
}: {
  query: Record<string, unknown>
  counts: ((query: Record<string, unknown>) => Counts | null) | undefined
  ready: boolean
}): Counts | null {
  const queryRef = useRef(query)
  queryRef.current = query
  const finger = JSON.stringify(query)

  return useMemo(() => {
    if (!ready || typeof counts !== 'function') return null
    try {
      return counts(queryRef.current) || null
    } catch (error) {
      return null
    }
    // query 内容由 finger 表达, finger 变化时 queryRef.current 即最新内容
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finger, ready, counts])
}
