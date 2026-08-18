/*
 * @Author: czy0729
 * @Date: 2026-06-06 16:46:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:08:26
 */
import type { PropsWithChildren } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { MaskColors, Props as ScrollViewProps } from '@components/scroll-view/types'

export type Props = PropsWithChildren<
  Pick<ScrollViewProps, 'showMask' | 'maskWidth'> & {
    /** 遮罩渐变色 [左, 中, 右] */
    maskColors: MaskColors

    /** 左侧遮罩动画样式 */
    leftMaskStyle: AnimatedStyle<ViewStyle>

    /** 右侧遮罩动画样式 */
    rightMaskStyle: AnimatedStyle<ViewStyle>

    /** 布局回调 */
    onLayout: (e: LayoutChangeEvent) => void
  }
>

export type MaskWidthOptions = {
  /** 是否平板 */
  isPad: boolean

  /** 横向内容区域宽度 (_.wind) */
  wind: number

  /** 平板内容区域宽度 (_._wind) */
  contentWind: number

  /** 平板宽度补偿系数 (PAD) */
  padMultiplier: number

  /** 是否 iOS */
  isIOS: boolean
}
