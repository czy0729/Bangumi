/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:32
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { PressTimings } from './types'

export const COMPONENT = rc(PARENT, 'TouchableScale')

/** 按住时缩小到的比例 */
export const SCALE = 0.96

/**
 * 触摸落下后需要保持按压多久 (ms) 才真正开始缩放
 *  - 列表滑动时, 手指落下的瞬间就会触发 onPressIn, 若立即缩放会"一滑就抖"
 *  - 等待期间抬手或列表接管手势 (onPressOut) 都会取消, 只有真正有意图的按压才会缩放
 *  - 全局滚动锁 (uiStore.isScrolling) 生效时同样跳过
 * */
export const HOLD_DELAY = 140

/** 抬手后等一小会再回弹 (给紧随其后的 press 让路, 避免"先回弹再下压"的闪烁) */
export const RESTORE_DELAY = 60

/** 轻点时补的下压时长: 让轻点也能看到"压下去"的反馈 */
export const TAP_DIP_DURATION = 80

/** 轻点 / 抬手后回弹到原尺寸的时长 */
export const TAP_RESTORE_DURATION = 120

/** 动画播完到真正跳转之间的额外等待 (ms), 保证"缩放进场"的节奏 */
export const NAVIGATE_DELAY = 30

/**
 * 全局跳转锁 (ms)
 *  - 跳转被推后约 230ms, 期间原卡片仍可交互; 若无全局锁, 快速连点两张卡会连续 push 两级
 *  - 该锁跨实例生效, 300ms 内只允许一次真正的跳转
 * */
export const COMMIT_LOCK = 300

/** 按压时序汇总, 状态机默认使用 (单测可注入定制值) */
export const PRESS_TIMINGS: PressTimings = {
  holdDelay: HOLD_DELAY,
  restoreDelay: RESTORE_DELAY,
  tapDipDuration: TAP_DIP_DURATION,
  tapRestoreDuration: TAP_RESTORE_DURATION,
  navigateDelay: NAVIGATE_DELAY
}

/** 按住时的弹簧 (稍快但仍柔和) */
export const PRESS_IN_SPRING = {
  damping: 20,
  stiffness: 200,
  mass: 0.6
}

/** 手势取消时的回弹弹簧 (更慢、带一点回弹, 像呼吸) */
export const PRESS_OUT_SPRING = {
  damping: 14,
  stiffness: 140,
  mass: 0.7
}
