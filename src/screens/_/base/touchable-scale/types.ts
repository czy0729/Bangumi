/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:26:46
 */
import type { TouchableProps, TouchablePressEvent } from '@components'
import type { Override } from '@types'

export type Props = Override<
  TouchableProps,
  {
    /** 按住时缩小到的比例, 默认 ds.SCALE */
    scale?: number
  }
>

/** 交互时序 (可由调用方注入, 便于测试与调参) */
export type PressTimings = {
  /** 触摸落下后需要保持按压多久 (ms) 才真正开始缩放 */
  holdDelay: number

  /** 抬手后等多久再回弹 (给紧随其后的 press 让路) */
  restoreDelay: number

  /** 轻点补的下压时长 */
  tapDipDuration: number

  /** 回弹到原尺寸的时长 */
  tapRestoreDuration: number

  /** 动画播完到跳转之间的额外等待 */
  navigateDelay: number
}

/**
 * 按压控制器的动作集合
 *  - 状态机 (utils) 只描述"什么时候该做什么", 具体动画与跳转由 hooks 层注入,
 *    因此纯逻辑可以脱离 React / reanimated 直接单测
 * */
export type PressActions = {
  /** 按下: 缩小 */
  pressDown: () => void

  /** 手势取消 (滑动列表接管): 回弹 */
  springBack: () => void

  /** 跳转前的定长回弹 (与跳转时机对齐) */
  timedBack: () => void

  /** 轻点: 下压 → 回弹 一整段 */
  tapPulse: () => void

  /** 真正执行跳转 */
  commit: (evt?: TouchablePressEvent) => void

  /** 当前是否处于列表滚动中 (滚动中忽略按压, 避免误触) */
  isScrolling: () => boolean
}

/** 按压控制器 */
export type PressController = {
  pressIn: () => void
  pressOut: () => void
  press: (evt?: TouchablePressEvent) => void

  /** 清掉所有挂起计时 (组件卸载时调用) */
  dispose: () => void
}

/** usePressScale 入参 */
export type UsePressScaleOptions = {
  /** 按住时缩小到的比例 */
  scale?: number

  /** 动画播完后的跳转回调 */
  onPress?: (evt?: TouchablePressEvent) => void

  /** 触摸落下回调 (在状态机之前调用, 不会被覆盖) */
  onPressIn?: TouchableProps['onPressIn']

  /** 抬手回调 (在状态机之前调用, 不会被覆盖) */
  onPressOut?: TouchableProps['onPressOut']
}
