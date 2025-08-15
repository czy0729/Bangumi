/*
 * @Author: czy0729
 * @Date: 2022-10-19 13:15:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 16:39:00
 */
import { PropsWithChildren } from 'react'
import { ScrollViewProps } from 'react-native'
import { ReactNode } from '@types'

export type Props = PropsWithChildren<{
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
  onTitlePress?: () => any

  /** 关闭回调函数 */
  onClose?: () => any

  onScroll?: ScrollViewProps['onScroll']
}>
