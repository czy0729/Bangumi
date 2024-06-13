/*
 * @Author: czy0729
 * @Date: 2024-06-14 00:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 00:36:37
 */
import { TextProps } from '@components'
import { Override } from '@types'

export type Props = Override<
  TextProps,
  {
    /** 验证的字符串 */
    text: string
  }
>
