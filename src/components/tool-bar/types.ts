/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:30:55
 */
import type { EventKeys } from '@constants/events'
import type { ColorValue, Override, ReactNode, ViewStyle } from '@types'
import type { Props as FlexProps } from '../flex/types'
import type { IconfontNames } from '../iconfont/types'
import type { PopoverData } from '../popover'
import type { TextType } from '../text'
import type { TouchableHandlePress } from '../touchable/types'

/** ToolBar.Icon 图标按钮的属性 */
export type ToolBarIconProps = {
  /** Iconfont 图标名称 */
  icon: IconfontNames

  /** 图标容器样式 */
  iconStyle?: ViewStyle

  /** 图标大小 */
  iconSize?: number

  /** 图标颜色 */
  iconColor?: ColorValue

  /** 点击回调 */
  onSelect: TouchableHandlePress
}

/** ToolBar.Popover 下拉选择器的属性 */
export type ToolBarPopoverProps<T extends PopoverData> = {
  /** 容器样式 */
  style?: ViewStyle

  /** 下拉菜单项样式 */
  itemStyle?: ViewStyle

  /** 下拉选项数据源 */
  data: T

  /** 左侧图标名称，默认 'menu' */
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

/** ToolBar.Touchable 可点击区域的属性 */
export type ToolBarTouchableProps = {
  /** 埋点事件 key */
  heatmap?: EventKeys

  /** 点击回调 */
  onSelect?: TouchableHandlePress

  /** 子元素 */
  children: ReactNode
}

/** ToolBar 根容器属性，继承 Flex 布局属性 */
type ToolBarProps = Override<
  FlexProps,
  {
    /** 容器样式 */
    style?: ViewStyle

    /** 子元素 */
    children?: ReactNode
  }
>

/** ToolBar 组件接口，包含 Icon、Popover、Touchable 子组件 */
export interface IToolBar {
  /** ToolBar 根容器 */
  (props: ToolBarProps): JSX.Element

  /** 图标按钮子组件 */
  Icon?: (props: ToolBarIconProps) => JSX.Element

  /** 下拉选择器子组件 */
  Popover?: <T extends PopoverData>(props: ToolBarPopoverProps<T>) => JSX.Element

  /** 可点击区域子组件 */
  Touchable?: (props: ToolBarTouchableProps) => JSX.Element
}
