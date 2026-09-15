/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:47
 */
import { COMMIT_LOCK, PRESS_TIMINGS } from './ds'

import type { PressActions, PressController, PressTimings } from './types'
import type { TouchablePressEvent } from '@components'

/** 挂起中的计时器通道 */
type TimerKey = 'hold' | 'restore' | 'navigate'

/** 上次真正跳转的时间戳, 跨实例共享 (见 ds.COMMIT_LOCK) */
let lastCommitAt = 0

/** 复位全局跳转锁 (测试用) */
export function resetCommitLock() {
  lastCommitAt = 0
}

/**
 * 创建按压状态机
 *  - 纯逻辑, 不依赖 React / reanimated: 动画与跳转由 PressActions 注入, 因此可以直接单测
 *  - 轻点 (按下后很快抬手): 播放下压 → 回弹, 动画播完才跳转
 *  - 按住再抬手: 定长回弹, 回弹结束再跳转
 *  - 手势被列表接管 (只有 pressOut 没有 press): 已按下则回弹, 不跳转
 * */
export function createPressController(
  actions: PressActions,
  timings: PressTimings = PRESS_TIMINGS
): PressController {
  const timers: Record<TimerKey, ReturnType<typeof setTimeout> | null> = {
    hold: null,
    restore: null,
    navigate: null
  }

  /** 是否处于"已按下缩小"状态 */
  let pressed = false

  function clear(key: TimerKey) {
    if (!timers[key]) return

    clearTimeout(timers[key])
    timers[key] = null
  }

  function clearAll() {
    clear('hold')
    clear('restore')
    clear('navigate')
  }

  function schedule(key: TimerKey, delay: number, fn: () => void) {
    clear(key)
    timers[key] = setTimeout(() => {
      timers[key] = null
      fn()
    }, delay)
  }

  function pressIn() {
    clearAll()

    schedule('hold', timings.holdDelay, () => {
      // 滚动中不缩放, 避免"一滑就抖"
      if (actions.isScrolling()) return

      pressed = true
      actions.pressDown()
    })
  }

  function pressOut() {
    clear('hold')

    // 抬手后稍等: 轻点场景 press 会紧接着触发, 交给 press 播放完整动画
    schedule('restore', timings.restoreDelay, () => {
      if (!pressed) return

      pressed = false
      actions.springBack()
    })
  }

  /** 真正跳转: 全局锁窗口内只放行一次, 避免跳转被推后期间跨卡片连点连 push 两级 */
  function commit(evt?: TouchablePressEvent) {
    const now = Date.now()
    if (now - lastCommitAt < COMMIT_LOCK) return

    lastCommitAt = now
    actions.commit(evt)
  }

  function press(evt?: TouchablePressEvent) {
    clearAll()

    // 按住过再抬手: 回弹完成后跳转
    if (pressed) {
      pressed = false
      actions.timedBack()
      schedule('navigate', timings.tapRestoreDuration + timings.navigateDelay, () => {
        commit(evt)
      })
      return
    }

    // 轻点: 补一段下压 → 回弹, 动画播完再跳转
    actions.tapPulse()
    schedule(
      'navigate',
      timings.tapDipDuration + timings.tapRestoreDuration + timings.navigateDelay,
      () => {
        commit(evt)
      }
    )
  }

  return {
    pressIn,
    pressOut,
    press,
    dispose: clearAll
  }
}
