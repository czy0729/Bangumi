/*
 * @Author: czy0729
 * @Date: 2023-12-04 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:32:47
 */
import type { PropsWithChildren } from 'react'
import type { ColorValue, IconfontNames, ViewStyle, WithViewStyles } from '@types'
import type { PopoverData } from '../../popover'

export type Props<Data extends PopoverData> = PropsWithChildren<
  WithViewStyles<{
    /** 图标名字 */
    name?: IconfontNames

    /** 图标大小 */
    size?: number

    /** 图标颜色 */
    color?: ColorValue

    /** Popover data */
    data?: Data

    /** 菜单样式 */
    menuStyle?: ViewStyle

    /** Popover onSelect */
    onSelect?: (title?: Data[number]) => any
  }>
>
