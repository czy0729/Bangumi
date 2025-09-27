/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:43:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 18:39:50
 */
import { Override } from '@types'
import { TextProps } from '../text'

export type Props = Override<
  Omit<TextProps, 'children'>,
  {
    end: number
  }
>
