/*
 * @Author: czy0729
 * @Date: 2026-09-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08 00:00:00
 *
 * 切后台 / 内存告警时释放可重建的运行时缓存
 */
import { useEffect } from 'react'
import { AppState, DeviceEventEmitter } from 'react-native'
import { logger } from '../dev'
import { clearRuntimeCaches } from '../memory'
import { getTimestamp } from '../utils'

/** 节流间隔（秒）, 避免反复切后台时重复清理 */
const THROTTLE_S = 30

/** 上次清理时间戳（秒） */
let lastTs = 0

/**
 * 监听 AppState 与系统内存告警, 清理可重建缓存 (含图片内存缓存)
 * - 只响应 background, 不响应 inactive (下拉通知栏、来电等过渡态会频繁触发)
 * - iOS 内存告警 (memoryWarning) 也立即清理: 前台大列表滚动被 Jetsam 前系统会先发告警,
 *   是否能收到随平台 / 版本而定, 收不到也不影响主链路
 * - 清理后回前台首次用到时重算 / 重新解码, 用户基本无感
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

    const warningSubscription = DeviceEventEmitter.addListener('memoryWarning', () => {
      // DEV 下可据此确认系统内存告警是否真的派发到 JS 侧
      logger.info('useRuntimeCacheRelease', 'memoryWarning')

      clearRuntimeCaches()
    })

    return () => {
      subscription.remove()
      warningSubscription.remove()
    }
  }, [])
}
