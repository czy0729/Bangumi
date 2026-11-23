/*
 * @Author: czy0729
 * @Date: 2026-11-24 10:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 10:20:00
 */
import { Dimensions, LayoutAnimation, UIManager } from 'react-native'
import { IOS } from '@constants'
import { DEFAULT_ANIMATION } from './ds'

import type { KeyboardEvent, KeyboardMetrics, LayoutAnimationConfig } from 'react-native'

// 注意如果要在 Android 上使用此动画，则需要在代码中启用
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

/** 键盘显示/隐藏时应用的布局动画 */
export function configureLayoutAnimation(event: KeyboardEvent) {
  const animationConfig: LayoutAnimationConfig = IOS
    ? LayoutAnimation.create(
        event.duration!,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity
      )
    : DEFAULT_ANIMATION
  LayoutAnimation.configureNext(animationConfig)
}

/** 键盘在屏幕上占用的高度 */
export function getKeyboardSpace(endCoordinates: KeyboardMetrics, topSpacing: number) {
  return Dimensions.get('window').height - endCoordinates.screenY + topSpacing
}
