/*
 * @Author: czy0729
 * @Date: 2026-10-08 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 22:48:07
 *
 * 动画通用层: 系统关闭动画的判定与 withTiming 的统一替代 (均只在 JS 线程调用)
 */
import { useReducedMotion, withTiming } from 'react-native-reanimated'
import { scheduleOnRN } from '../worklets'

/** 与 withTiming 的 config 一致 */
type TimingConfig = Parameters<typeof withTiming>[1]

/** 与 withTiming 的 callback 一致 */
type TimingCallback = NonNullable<Parameters<typeof withTiming>[2]>

/** reanimated 的 useReducedMotion 无状态, 只返回模块加载期常量, 故可当普通函数读取 */
const readReducedMotion = useReducedMotion as unknown as () => boolean

/** 系统是否已关闭动画, 与 reanimated 内部判定同一标志, 运行中修改需重启 */
const ANIMATION_DISABLED = readReducedMotion()

/**
 * 系统是否已关闭动画: 安卓「关闭动画」(TRANSITION_ANIMATION_SCALE 为 0) / iOS「减少动态效果」
 * 只在 JS 线程调用, worklet 内请改用 JS 线程取到的布尔值
 */
export function isAnimationDisabled(): boolean {
  return ANIMATION_DISABLED
}

/**
 * withTiming 的统一替代: 系统关闭动画时直接返回终值并回调, 不创建动画
 *
 * 关闭动画时可见性不再依赖动画完成, 避免图层停在隐藏态 (例如弹窗只显示遮罩);
 * 只在 JS 线程调用, 关闭动画与正常动画两条分支的回调都落到 JS 线程
 */
export function timing(toValue: number, config?: TimingConfig, callback?: TimingCallback): number {
  if (ANIMATION_DISABLED) {
    if (callback) callback(true)
    return toValue
  }

  // 回调必须是内联箭头 + 显式 worklet: 外部传入的函数变量交给 withTiming 不会被自动 worklet 化
  return withTiming(toValue, config, (finished: boolean) => {
    'worklet'
    if (callback) scheduleOnRN(callback, finished)
  })
}
