/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:21:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 04:46:33
 */
import { Override } from '@types'
import { ImageProps } from '../image'

export type Props = Override<
  Omit<ImageProps, 'children'>,
  {
    /** 表情索引 */
    index?: number

    /** 表情大小 */
    size?: number
  }
>
