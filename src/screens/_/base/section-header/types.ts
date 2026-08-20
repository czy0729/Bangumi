/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:14:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:24:23
 */
import type { PropsWithChildren } from 'react'
import type { TextProps, TextType } from '@components'
import type { ReactNode, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<
    {
      /** 文字类型 */
      type?: TextType

      /** 右侧额外内容 */
      right?: ReactNode
    } & Pick<TextProps, 'size'>
  >
>
