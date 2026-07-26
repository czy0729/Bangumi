/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-27 07:27:35
 */
import type { PropsWithChildren } from 'react'
import type { Fn, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否显示 */
    show: boolean

    /** 切换回调 */
    onToggle: Fn
  }>
>
