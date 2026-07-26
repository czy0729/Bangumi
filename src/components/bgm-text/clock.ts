/*
 * @Author: czy0729
 * @Date: 2026-03-28 21:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 00:57:23
 */
import { AppState } from 'react-native'
import { IOS } from '@constants'

type Listener = (clock: number) => void

/** 订阅者列表 */
const listeners = new Set<Listener>()

/** 时钟滴答计数 */
let clock = 0

/** 上一帧时间戳 */
let lastTime = 0

/** requestAnimationFrame id */
let rafId: number | null = null

function loop(currentTime: number) {
  // 控制频率：120ms 触发一次
  if (currentTime - lastTime >= (IOS ? 120 : 160)) {
    lastTime = currentTime

    // 只有在前台时才更新
    if (AppState.currentState === 'active') {
      clock += 1
      listeners.forEach(fn => fn(clock))
    }
  }

  // 只有还有订阅者时才继续循环
  if (listeners.size > 0) {
    rafId = requestAnimationFrame(loop)
  } else {
    rafId = null
  }
}

export function subscribeClock(fn: Listener) {
  listeners.add(fn)

  if (listeners.size === 1 && rafId === null) {
    lastTime = performance.now()
    rafId = requestAnimationFrame(loop)
  }

  return () => {
    listeners.delete(fn)
    // 自动清理逻辑已经在 loop 结尾处理
  }
}
