/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 11:00:00
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { useProgress } from './hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props as ProgressBarProps } from './types'
export type { ProgressBarProps }

/**
 * 进度条, 高度由 barStyle 或默认 border 决定, 宽度随 percent 变化
 */
export const ProgressBar = observer(
  ({
    percent = 0,
    style,
    barStyle,
    wrapWidth,
    position = 'normal',
    unfilled = true,
    appearTransition = false
  }: ProgressBarProps) => {
    r(COMPONENT)

    const { targetWidth, animatedStyle, handleLayout } = useProgress(
      percent,
      wrapWidth,
      appearTransition
    )

    return (
      <View
        style={[
          styles.progressOuter,
          position === 'fixed' && { position: 'absolute', top: 0 },
          !unfilled && { backgroundColor: 'transparent' },
          style
        ]}
        onLayout={handleLayout}
      >
        {appearTransition ? (
          <Animated.View style={[styles.progressBar, animatedStyle, barStyle]} />
        ) : (
          <View style={[styles.progressBar, { width: targetWidth, height: 0 }, barStyle]} />
        )}
      </View>
    )
  }
)

export default ProgressBar
