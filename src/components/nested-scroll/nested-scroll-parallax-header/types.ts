/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:40:03
 */
import { PropsWithChildren } from 'react'
import { ImageSourcePropType } from 'react-native'

export type Props = PropsWithChildren<{
  pages: string[]
  imageHeight: number
  imageSource: ImageSourcePropType
  stickyHeight: number
  HeaderComponent?: JSX.Element
  OverflowHeaderComponent?: JSX.Element
  TopNavbarComponent?: JSX.Element
}>
