/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:21:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 06:21:42
 */
import type { Override } from '@types'
import type { ImageProps } from '../image'

export type Props = Override<
  Omit<ImageProps, 'children'>,
  {
    /** 表情索引 */
    index?: number | string

    /** 表情大小 */
    size?: number
  }
>
