/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { EXIT_THRESHOLD } from './ds'

/** 硬件退后拦截结果：exit 退出应用 / prompt 提示再按一次 / route 交给路由 */
export type BackAndroidResult = 'exit' | 'prompt' | 'route'

/** 根据路由层级与上次退后时间，计算安卓硬件退后的处理结果 */
export function getBackAndroidResult(
  index: number | undefined,
  lastBackPressed: number,
  now: number
): BackAndroidResult {
  // 非根 Tab（index 不为 0）交给路由栈处理
  if (index !== 0) return 'route'

  // 在阈值内再次退后，直接退出应用
  if (lastBackPressed && lastBackPressed + EXIT_THRESHOLD >= now) return 'exit'

  // 首次退后，提示「再按一次」
  return 'prompt'
}
