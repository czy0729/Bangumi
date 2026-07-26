/*
 * @Author: czy0729
 * @Date: 2026-01-23 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 07:26:26
 */
import type { GestureResponderHandlers, StyleProp, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'

/** 可拖拽数据项 */
export type BaseItem = {
  /** 唯一标识 */
  key: string | number

  /** 是否禁用拖拽 */
  disabledDrag?: boolean
}

/** 拖拽块属性 */
export type BlockProps = {
  /** 唯一标识 */
  id: string

  /** 位置映射 */
  positions: SharedValue<Record<string, number>>

  /** 块宽度 */
  blockWidth: number

  /** 块高度 */
  blockHeight: number

  /** 列数 */
  numColumns: number

  children: React.ReactNode

  /** 拖拽结束回调 */
  onDragEnd: (finalPositions: Record<string, number>) => void

  /** 是否禁用 */
  disabled?: boolean
}

/** 动画块包裹组件属性 */
export type BlockWrapperProps = {
  /** 容器样式 */
  style?: StyleProp<ViewStyle>

  /** 拖拽动画样式 */
  dragStartAnimationStyle?: StyleProp<ViewStyle>

  /** 长按回调 */
  onLongPress?: () => void

  children: React.ReactNode

  /** 手势处理器 */
  panHandlers?: GestureResponderHandlers

  /** 长按延迟 */
  delayLongPress?: number
}

/** 拖拽网格组件属性 */
export type Props<T> = {
  data: T[]

  /** 列数 */
  numColumns: number

  /** 渲染函数 */
  renderItem: (item: T, index: number) => React.ReactElement

  /** 拖拽释放回调 */
  onDragRelease?: (newData: T[]) => void

  /** 每一项高度 */
  itemHeight?: number
}
