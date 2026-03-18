/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:41:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 05:29:15
 */
import type { ViewProps } from 'react-native'
import type { Override } from '@types'
import type { ComponentProps } from '../component'

export type Props = Override<
  ViewProps,
  {
    id?: ComponentProps['id']
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  }
>

export type ItemProps = Override<
  ViewProps,
  {
    flex?: number
  }
>
