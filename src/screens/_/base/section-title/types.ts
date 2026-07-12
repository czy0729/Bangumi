/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:25:16
 */
import type { PropsWithChildren } from 'react'
import type { Fn, IconfontNames, ReactNode, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 图标名，同 Iconfont name */
    icon?: '' | 'bgm' | IconfontNames

    /** 左侧额外内容 */
    left?: ReactNode

    /** 右侧额外内容 */
    right?: ReactNode

    /** 是否启用分割样式 */
    splitStyles?: boolean

    /** 标题点击回调 */
    onPress?: Fn
  }>
>
