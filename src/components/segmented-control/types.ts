/*
 * @Author: czy0729
 * @Date: 2022-06-04 22:34:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 04:20:00
 */
import type { ColorValue, DataSource, TextStyle, ViewStyle, WithViewStyles } from '@types'
import type { TextType } from '../text'

/** 分段选择器切换事件 */
type SegmentedControlEvent = {
  nativeEvent: {
    value: string
    selectedSegmentIndex: number
  }
}

export type Props<T extends DataSource> = WithViewStyles<{
  /** 额外容器样式 */
  styleExtra?: ViewStyle

  /** 文字样式 */
  fontStyle?: TextStyle

  /** 选中文字样式 */
  activeFontStyle?: TextStyle

  /** 文本类型 */
  type?: TextType

  /** 字体大小 */
  size?: number

  /** 选项数据源 */
  values?: T

  /** 当前选中索引 */
  selectedIndex?: number

  /** 是否可用 */
  enabled?: boolean

  /** 选中指示器颜色 */
  tintColor?: ColorValue

  /** 背景色 */
  backgroundColor?: ColorValue

  /** 切换回调，返回原生事件对象 */
  onChange?: (event?: SegmentedControlEvent) => void

  /** 切换回调，返回选中的值 */
  onValueChange?: (value?: T[number]) => void
}>
