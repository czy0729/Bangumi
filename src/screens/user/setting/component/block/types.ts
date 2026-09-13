/*
 * @Author: czy0729
 * @Date: 2024-07-04 05:23:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:30:00
 */
import type { ReactNode } from 'react'
import type { View, ViewProps } from 'react-native'
import type { Override } from '@types'

export type Props = Override<
  ViewProps,
  {
    /**
     * 分组标题, 渲染在卡片外部 (与卡片一起决定是否展示)
     *  - 与 title 的区别: title 是滚动定位用的锚点 id, 不参与渲染
     * */
    tip?: ReactNode

    /** 滚动定位锚点 id */
    title?: string

    /** 收集容器 View 实例, 用于页内定位 */
    onBlockRef?: (ref: View | null, component: string) => void
  }
>
