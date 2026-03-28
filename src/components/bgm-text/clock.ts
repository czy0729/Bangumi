/*
 * @Author: czy0729
 * @Date: 2026-03-28 21:56:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-29 00:34:37
 */
type Listener = (clock: number) => void

let clock = 0
let timer: ReturnType<typeof setInterval> | null = null
const listeners = new Set<Listener>()

/** 触发一次心跳 */
function tick() {
  clock += 1
  listeners.forEach(fn => fn(clock))
}

/**
 * 订阅全局心跳
 * @returns 取消订阅的函数
 */
export function subscribeClock(fn: Listener) {
  listeners.add(fn)

  // 状态激活：第一个订阅者加入时启动定时器
  if (listeners.size === 1 && !timer) {
    timer = setInterval(tick, 120)
  }

  return () => {
    listeners.delete(fn)

    // 状态休眠：没有任何订阅者时清理定时器，节省资源
    if (listeners.size === 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }
}
