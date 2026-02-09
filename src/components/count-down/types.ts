/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:43:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:13:09
 */
import type { Override } from '@types'
import type { TextProps } from '../text'

export type Props = Override<
  Omit<TextProps, 'children'>,
  {
    end: number
  }
>
