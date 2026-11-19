/*
 * @Author: czy0729
 * @Date: 2026-11-20 07:00:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-11-20 07:00:23
 *
 * 头部延迟区块的分帧放行
 */
import { useEffect } from 'react'
import { postTask } from '@utils/scheduler'

import type { Ctx } from '../../types'

/** 相邻两次放行的间隔, 用于让出渲染帧 */
const STEP_DELAY = 16

/** 放行总耗时上限, 超过则一次性补齐 */
const MAX_DURATION = 400

/**
 * 转场完成后逐个放行延迟区块
 * - 由 store 的 deferredCount 驱动, 每次只放行一个区块, 避免所有区块集中在同一帧挂载
 * - deferredCount 为 0 表示转场未完成, 此时不开始
 * - 达到 total 或已被外部强制放行时结束
 *
 * @param $ 条目页面 store
 * @param total 延迟区块总数
 * @returns 已放行的区块数量
 */
export function useDeferredBlocks($: Ctx['$'], total: number) {
  /** 已放行数量, 只关心 0 与非 0 的翻转, 避免每次递增都重建任务链 */
  const count = Math.min($.state.deferredCount, total)
  const started = count > 0

  useEffect(() => {
    if (!started) return

    let alive = true
    const startTime = Date.now()
    const step = () => {
      if (!alive) return

      const current = $.state.deferredCount
      if (current >= total) return

      // 放行链被长时间占用时直接补齐, 避免页面一直短一截
      const next = Date.now() - startTime > MAX_DURATION ? total : current + 1
      $.setState({
        deferredCount: next
      })
      if (next < total) postTask(step, STEP_DELAY, 'user-visible')
    }
    postTask(step, STEP_DELAY, 'user-visible')

    return () => {
      alive = false
    }
  }, [$, started, total])

  return count
}
