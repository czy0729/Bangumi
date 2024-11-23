/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:11:05
 */
import { EventKeys } from '@constants/events'
import { ColorValue, Override, ReactNode, TextStyle, ViewStyle } from '@types'
import { Props as FlexProps } from '../flex/types'
import { IconfontNames } from '../iconfont/types'
import { PopoverData } from '../popover'
import { TextType } from '../text'
import { Props as TouchableProps } from '../touchable/types'

export type ToolBarIconProps = {
  icon: IconfontNames
  iconStyle?: TextStyle
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
