/*
 * @Author: czy0729
 * @Date: 2022-05-31 08:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:51:08
 */
import type { ColorValue, Fn, ViewStyle, WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 展开箭头容器样式 */
    moreStyle?: ViewStyle

    /** 展开箭头颜色 */
    iconColor?: ColorValue

    /** 比例 */
    ratio?: number

    /** 是否显示渐变 */
    linearGradient?: boolean

    /** 渐变颜色 */
    linearGradientColor?: [string, string, string]

    /** 是否检测首屏渲染时内部组件高度, 若高度小于收缩容器高度, 直接调用展开回调 */
    checkLayout?: boolean

    /** 展开回调 */
    onExpand?: Fn

    /** 点击回调替代展开 */
    onPress?: Fn
  }>
>
