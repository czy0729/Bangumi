/*
 * @Author: czy0729
 * @Date: 2022-07-30 17:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import type { Override } from '@types'
import type { TextProps } from '../text'

export type Props = Override<
  TextProps,
  {
    /** 高亮文字, 传数组时逐个标出所有命中位置 */
    value: string | readonly string[]

    /** 是否转简体 */
    t2s?: boolean
  }
>
