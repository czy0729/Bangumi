/*
 * @Author: czy0729
 * @Date: 2022-05-28 05:41:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 05:06:12
 */
import type { ViewProps } from 'react-native'
import type { Override } from '@types'
import type { ComponentProps } from '../component'

export type Props = Override<
  ViewProps,
  {
    id?: ComponentProps['id']

    /** flexDirection */
    direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

    /** flexWrap */
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'

    /** justifyContent (start/end/between/around 会自动映射为 CSS 标准值) */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'

    /** alignItems */
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  }
>

export type ItemProps = Override<
  ViewProps,
  {
    /** flex 值，默认 1 */
    flex?: number
  }
>
