/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:08:51
 */
import { runOnJS, runOnUI } from 'react-native-reanimated'

/** 在 UI worklet 中调度函数到 JS 线程执行 (Android 降级环境无 worklets, 用 reanimated 的 runOnJS) */
export function scheduleOnRN<Args extends unknown[]>(
  fun: (...args: Args) => void,
  ...args: Args
): void {
  'worklet'
  runOnJS(fun)(...args)
}

/** 在 JS 线程调度 worklet 到 UI 线程执行 (Android 降级环境无 worklets, 用 reanimated 的 runOnUI) */
export function scheduleOnUI<Args extends unknown[], ReturnValue>(
  worklet: (...args: Args) => ReturnValue,
  ...args: Args
): void {
  runOnUI(worklet)(...args)
}
