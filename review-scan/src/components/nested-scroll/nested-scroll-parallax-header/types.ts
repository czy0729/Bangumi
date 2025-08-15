/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 20:53:06
 */
import { PropsWithChildren } from 'react'
import { ImageSourcePropType } from 'react-native'
import { ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  pages: string[]
  initialPage?: number
  imageHeight?: number
  imageSource: ImageSourcePropType
  blurRadius?: number
  stickyHeight?: number
  spacing?: number

  /** 使用本地化加速下一次的 onLayout */
  tabBarLocalKey: string
  tabStyle?: ViewStyle
  HeaderComponent?: JSX.Element
  OverflowHeaderComponent?: JSX.Element
  TopNavbarComponent?: JSX.Element
  TabBarLeft?: JSX.Element
  renderLabel?: (item: { title: string }) => JSX.Element
  onIndexChange?: (position: number) => any
}>
