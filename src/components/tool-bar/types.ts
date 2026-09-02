/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 23:13:12
 */
import type { Override, ReactNode, ViewStyle } from '@types'
import type { Props as FlexProps } from '../flex/types'
import type { PopoverData } from '../popover'
import type { Props as IconProps } from './icon/types'
import type { Props as PopoverProps } from './popover/types'
import type { Props as TouchableProps } from './touchable/types'

/** ToolBar 根容器属性，继承 Flex 布局属性 */
export type Props = Override<
  FlexProps,
  {
    /** 容器样式 */
    style?: ViewStyle

    /** 子元素 */
    children?: ReactNode
  }
>

/** ToolBar 组件接口，包含 Icon、Popover、Touchable 子组件 */
export type IToolBar = {
  /** ToolBar 根容器 */
  (props: Props): JSX.Element

  /** 图标按钮子组件 */
  Icon?: (props: IconProps) => JSX.Element

  /** 下拉选择器子组件 */
  Popover?: <T extends PopoverData>(props: PopoverProps<T>) => JSX.Element

  /** 可点击区域子组件 */
  Touchable?: (props: TouchableProps) => JSX.Element
}
