/*
 * @Author: czy0729
 * @Date: 2022-06-13 08:05:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 07:14:19
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 1-100 用于控制模糊效果的强度 */
    intensity?: number
  }>
>
