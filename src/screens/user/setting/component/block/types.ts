/*
 * @Author: czy0729
 * @Date: 2024-07-04 05:23:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 05:48:11
 */
import type { View, ViewProps } from 'react-native'
import type { Override } from '@types'

export type Props = Override<
  ViewProps,
  {
    title?: string

    /** 收集容器 View 实例, 用于页内定位 */
    onBlockRef?: (ref: View | null, component: string) => void
  }
>
