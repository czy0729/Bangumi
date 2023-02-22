/*
 * @Author: czy0729
 * @Date: 2022-07-30 17:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 05:02:58
 */
import { Override } from '@types'
import { TextProps } from '../text'

export type Props = Override<
  TextProps,
  {
    /** 高亮文字 */
    value: string

    t2s?: boolean
  }
>
