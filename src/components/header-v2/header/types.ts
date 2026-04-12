/*
 * @Author: czy0729
 * @Date: 2025-10-25 15:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-13 06:52:34
 */
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<
    ComponentProps,
    | 'transparent'
    | 'title'
    | 'headerTitleAlign'
    | 'headerTitleStyle'
    | 'headerTitleSize'
    | 'headerTitleAppend'
    | 'headerTitleTextStyle'
    | 'headerRight'
  >,
  {
    style: ComponentProps['backgroundStyle']
  }
>
