/*
 * @Author: czy0729
 * @Date: 2024-06-14 00:36:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:33:50
 */
import type { TextProps } from '@components'
import type { Override } from '@types'

export type Props = Override<
  TextProps,
  {
    /** 验证的字符串 */
    text: string

    /** 通知需要优化的回调, 使用去除的方式代替修正行高 */
    onHit?: (removeSpecText: string) => any
  }
>
