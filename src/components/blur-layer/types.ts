/*
 * @Author: czy0729
 * @Date: 2026-11-26 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-26 12:00:00
 *
 * 自研模糊层 (Android) 的 props
 *  - 实现见 android/app/src/main/java/com/czy0729/bangumi/blur
 *  - 多个 BlurLayer 共享同一个 BlurRootView 的一次抓取
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

/** 模糊根容器: 包住需要被采样的内容 */
export type BlurRootViewProps = PropsWithChildren<
  WithViewStyles<{
    /** 节点名称, 与 BlurLayer 的 blurNode 配对 */
    name?: string
  }>
>

/** 模糊层: 从 root 的共享采样里按自身位置裁剪绘制 */
export type BlurLayerProps = PropsWithChildren<
  WithViewStyles<{
    /** 关联的 BlurRootView 名称 */
    blurNode?: string

    /** 模糊半径 0~25 */
    radius?: number

    /** 叠加色 (ARGB int) */
    overlayColor?: number
  }>
>
