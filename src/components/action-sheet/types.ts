/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 23:55:47
 */
import type { PropsWithChildren } from 'react'
import type { ReactNode } from '@types'
import type { ScrollViewProps } from '../scroll-view'

export type Props = PropsWithChildren<{
  /** 连接组件内部 ScrollView.scrollTo */
  forwardRef?: ScrollViewProps['forwardRef']

  /** 是否显示 */
  show?: boolean

  /** 高度，不会超过屏幕高度的 88% */
  height?: number

  /** 标题 */
  title?: string | ReactNode

  /** 标题左侧 */
  titleLeft?: ReactNode

  /** 是否包裹 ScrollView */
  scrollEnabled?: boolean

  /** 是否包裹 Portal */
  usePortal?: boolean

  /** 标题点击回调函数 */
  onTitlePress?: () => void

  /** 关闭回调函数 */
  onClose?: () => void

  /** ScrollView.onScroll */
  onScroll?: ScrollViewProps['onScroll']
}>
