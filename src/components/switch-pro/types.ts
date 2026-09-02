/*
 * @Author: czy0729
 * @Date: 2026-03-17 04:06:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 01:07:31
 */
import type { ColorValue, ViewStyle, WithViewStyles } from '@types'

/** 切换开关的函数类型 */
export type ToggleSwitchFn = (result: boolean, callback?: (value: boolean) => void) => void

export type Props = WithViewStyles<{
  /** 开关当前值 */
  value: boolean

  /** 容器宽度，默认 52 */
  width?: number

  /** 容器高度，默认 32 */
  height?: number

  /** 是否禁用 */
  disabled?: boolean

  /** 开启状态背景色，默认 '#43d551' */
  backgroundActive?: ColorValue

  /** 关闭状态背景色，默认 '#dddddd' */
  backgroundInactive?: ColorValue

  /** 开启状态圆圈颜色，默认 'white' */
  circleColorActive?: ColorValue

  /** 关闭状态圆圈颜色，默认 'white' */
  circleColorInactive?: ColorValue

  /** 圆圈自定义样式 */
  circleStyle?: ViewStyle

  /** 同步点击回调，立即执行 */
  onSyncPress?: (value?: boolean) => void

  /** 异步点击回调，接收 toggleSwitch 函数用于异步完成后手动触发切换 */
  onAsyncPress?: (toggleSwitch?: ToggleSwitchFn) => void
}>

/** useSwitch 参数 (背景色必传, 主题色兜底由 index.tsx 提供) */
export type UseSwitchOptions = Required<Pick<Props, 'backgroundActive' | 'backgroundInactive'>> &
  Pick<
    Props,
    | 'value'
    | 'width'
    | 'height'
    | 'disabled'
    | 'circleColorActive'
    | 'circleColorInactive'
    | 'onSyncPress'
    | 'onAsyncPress'
  >
