/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:05
 */
import type { EventKeys } from '@constants/events'
import type { ColorValue, Override, ReactNode, ViewStyle } from '@types'
import type { Props as FlexProps } from '../flex/types'
import type { IconfontNames } from '../iconfont/types'
import type { PopoverData } from '../popover'
import type { TextType } from '../text'
import type { Props as TouchableProps } from '../touchable/types'

export type ToolBarIconProps = {
  icon: IconfontNames
  iconStyle?: ViewStyle
  iconColor?: ColorValue
  onSelect: (event?: any) => any
}

export type ToolBarPopoverProps<T extends PopoverData> = {
  style?: ViewStyle
  itemStyle?: ViewStyle
  data: T
  icon?: IconfontNames
  iconColor?: ColorValue
  iconSize?: number
  type?: TextType
  text?: string | number | false
  heatmap?: EventKeys
  transparent?: boolean
  onSelect?: (title?: T[number], index?: number) => any
}

export type ToolBarTouchableProps = {
  heatmap?: EventKeys
  onSelect?: TouchableProps['onPress']
  children: ReactNode
}

type ToolBarProps = Override<
  FlexProps,
  {
    style?: ViewStyle
    children?: ReactNode
  }
>

export interface IToolBar {
  (props: ToolBarProps): JSX.Element
  Icon?: (props: ToolBarIconProps) => JSX.Element
  Popover?: <T extends PopoverData>(props: ToolBarPopoverProps<T>) => JSX.Element
  Touchable?: (props: ToolBarTouchableProps) => JSX.Element
}
