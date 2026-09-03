/*
 * @Author: czy0729
 * @Date: 2022-05-05 19:38:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:52
 */
import type { EventKeys } from '@constants'
import type { ColorValue, ViewStyle } from '@types'
import type { IconfontNames } from '../../iconfont/types'
import type { PopoverData } from '../../popover'
import type { TextType } from '../../text'

/** ToolBar.Popover 下拉选择器的属性 */
export type Props<T extends PopoverData> = {
  /** 容器样式 */
  style?: ViewStyle

  /** 下拉菜单项样式 */
  itemStyle?: ViewStyle

  /** 下拉选项数据源 */
  data: T

  /** 左侧图标名称，不传不显示 */
  icon?: IconfontNames

  /** 图标颜色 */
  iconColor?: ColorValue

  /** 图标大小 */
  iconSize?: number

  /** 文本类型/样式 */
  type?: TextType

  /** 按钮文本，false 时不显示文本 */
  text?: string | number | false

  /** 埋点事件 key */
  heatmap?: EventKeys

  /** 是否透明背景 */
  transparent?: boolean

  /** 选中回调，参数为选中项文本和索引 */
  onSelect?: (title?: T[number], index?: number) => void
}
