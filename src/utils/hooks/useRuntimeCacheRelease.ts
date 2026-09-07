/*
 * @Author: czy0729
 * @Date: 2026-09-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08 00:00:00
 *
 * 切后台时释放可重建的运行时缓存
 */
import { useEffect } from 'react'
import { AppState } from 'react-native'
import { clearRuntimeCaches } from '../memory'
import { getTimestamp } from '../utils'

/** 节流间隔（秒）, 避免反复切后台时重复清理 */
const THROTTLE_S = 30

/** 上次清理时间戳（秒） */
let lastTs = 0

/**
 * 监听 AppState, 进入后台时清理可重建缓存
 * - 只响应 background, 不响应 inactive (下拉通知栏、来电等过渡态会频繁触发)
 * - 清理后回前台首次用到时重算, 成本为一次解析 / 遍历, 用户无感
 */
export default function useRuntimeCacheRelease() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState !== 'background') return

      const now = getTimestamp()
      if (now - lastTs < THROTTLE_S) return

      lastTs = now
      clearRuntimeCaches()
    })

    return () => subscription.remove()
  }, [])
}
