/*
 * @Author: czy0729
 * @Date: 2023-12-04 15:42:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 05:57:06
 */
import type { PropsWithChildren } from 'react'
import type { IconfontNames, Override, WithViewStyles } from '@types'
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

        /** Popover onSelect */
        onSelect?: (title?: Data[number], index?: number) => void
      }
    >
  >
>
