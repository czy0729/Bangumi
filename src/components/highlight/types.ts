/*
 * @Author: czy0729
 * @Date: 2022-07-30 17:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 09:20:58
 */
import type { Override } from '@types'
import type { TextProps } from '../text'

export type Props = Override<
  TextProps,
  {
    /** 高亮文字 */
    value: string

    /** 是否转简体 */
    t2s?: boolean
  }
>
