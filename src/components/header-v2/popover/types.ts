/*
 * @Author: czy0729
 * @Date: 2023-12-04 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 17:24:48
 */
import type { PropsWithChildren } from 'react'
import type { IconfontNames, Override, ViewStyle, WithViewStyles } from '@types'
import type { PopoverData } from '../../popover'
import type { Props as ComponentProps } from '../types'

export type Props<Data extends PopoverData> = PropsWithChildren<
  WithViewStyles<
    Override<
      Pick<ComponentProps, 'color'>,
      {
        /** 图标名字 */
        name?: IconfontNames

        /** 图标大小 */
        size?: number

        /** Popover data */
        data?: Data

        /** 菜单样式 */
        menuStyle?: ViewStyle

        /** Popover onSelect */
        onSelect?: (title?: Data[number], index?: number) => void
      }
    >
  >
>
