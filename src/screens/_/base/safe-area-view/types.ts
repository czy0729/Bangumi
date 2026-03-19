/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:21:28
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

type Direction = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal'
type ForceInset = 'always' | 'never'

export type Props = PropsWithChildren<
  WithViewStyles<{
    forceInset?: {
      [K in Direction]?: ForceInset
    }
  }>
>
