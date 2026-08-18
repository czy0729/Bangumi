/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import type { ViewStyle } from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { MaskColors } from '@components/scroll-view/types'

export type MaskGradientProps = {
  /** 定位样式 (左/右) */
  positionStyle: ViewStyle

  /** 动画样式 */
  animatedStyle: AnimatedStyle<ViewStyle>

  /** 渐变颜色 [左, 中, 右] */
  colors: MaskColors

  /** 遮罩宽度 */
  width: number

  /** 是否反向渐变 (右侧镜像淡出) */
  reverse?: boolean
}
