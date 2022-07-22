/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:38:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:51:05
 */
import { ColorValue, Override, ReactNode, TextStyle, ViewStyle } from '@types'
import { EventKeys } from '@constants/events'
import { Props as FlexProps } from '../flex/types'
import { Props as PopoverProps } from '../popover/types'
import { Props as TouchableProps } from '../touchable/types'
import { IconfontNames } from '../iconfont/types'
import { TextType } from '../text'

export type ToolBarIconProps = {
  icon: IconfontNames
  iconStyle?: TextStyle
  iconColor?: ColorValue
  onSelect: (event?: any) => any
}

export type ToolBarPopoverProps = {
  data: PopoverProps['data']
  icon?: IconfontNames
  iconColor?: ColorValue
  iconSize?: number
  type?: TextType
  text?: string | number | false
  heatmap?: EventKeys
  transparent?: boolean
  onSelect?: PopoverProps['onSelect']
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
  Popover?: (props: ToolBarPopoverProps) => JSX.Element
  Touchable?: (props: ToolBarTouchableProps) => JSX.Element
}
