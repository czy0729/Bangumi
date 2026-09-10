/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 12:00:00
 */
import type { PropsWithChildren } from 'react'
import type { ReactNode } from '@types'
import type { ScrollViewProps } from '../scroll-view'

export type Props = PropsWithChildren<{
  /** 连接组件内部 ScrollView 的 scrollTo 方法 (scrollEnabled 为 false 时无滚动容器, 不生效) */
  forwardRef?: ScrollViewProps['forwardRef']

  /** 滚动内容区容器样式 (scrollEnabled 为 false 时作为内容容器样式使用) */
  contentContainerStyle?: ScrollViewProps['contentContainerStyle']

  /** 是否显示, 默认 false */
  show?: boolean

  /** 面板高度, 不会超过屏幕高度的 88%, 默认 480 */
  height?: number

  /** 标题, 传入 ReactNode 时按节点渲染 */
  title?: string | ReactNode

  /** 标题左侧自定义内容 */
  titleLeft?: ReactNode

  /**
   * 内容是否包裹 ScrollView 支持滚动, 默认 true
   * 为 false 时内容容器是普通 View, 此时 onScroll 与 forwardRef 不生效
   */
  scrollEnabled?: boolean

  /** 是否通过 Portal 挂载到全局, 默认 true */
  usePortal?: boolean

  /** 标题点击回调 */
  onTitlePress?: () => void

  /** 关闭回调 */
  onClose?: () => void

  /** 滚动回调 */
  onScroll?: ScrollViewProps['onScroll']
}>
