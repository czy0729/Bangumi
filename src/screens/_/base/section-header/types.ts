/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:14:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:24:23
 */
import type { PropsWithChildren } from 'react'
import type { TextType } from '@components'
import type { ReactNode, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    type?: TextType
    size?: number
    right?: ReactNode
  }>
>
