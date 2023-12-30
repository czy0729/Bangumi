/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 10:04:54
 */
import { PropsWithChildren } from 'react'
import { ImageSourcePropType } from 'react-native'

export type Props = PropsWithChildren<{
  pages: string[]
  initialPage?: number
  imageHeight?: number
  imageSource: ImageSourcePropType
  stickyHeight?: number
  spacing?: number

  /** 使用本地化加速下一次的 onLayout */
  tabBarLocalKey: string
  HeaderComponent?: JSX.Element
  OverflowHeaderComponent?: JSX.Element
  TopNavbarComponent?: JSX.Element
  TabBarLeft?: JSX.Element
  renderLabel?: (item: { title: string }) => JSX.Element
  onIndexChange?: (position: number) => any
}>
