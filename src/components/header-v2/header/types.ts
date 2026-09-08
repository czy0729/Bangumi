/*
 * @Author: czy0729
 * @Date: 2025-10-25 15:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import type { Override } from '@types'
import type { StaticProps } from '../types'

export type Props = Override<
  Pick<
    StaticProps,
    | 'transparent'
    | 'title'
    | 'color'
    | 'onBackPress'
    | 'headerTitleAlign'
    | 'headerTitleStyle'
    | 'headerTitleSize'
    | 'headerTitleAppend'
    | 'headerTitleTextStyle'
    | 'headerRight'
  >,
  {
    style: StaticProps['backgroundStyle']
  }
>
