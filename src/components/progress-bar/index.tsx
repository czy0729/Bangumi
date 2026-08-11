/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import React, { useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import { observer } from 'mobx-react'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Animated from 'react-native-reanimated'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { getWidth } from './utils'

import type { Props as ProgressBarProps } from './types'
export type { ProgressBarProps }

/**
 * 进度条, 高度由 barStyle 或默认 border 决定, 宽度随 percent 变化
 */
function ProgressBar({
  percent = 0,
  style,
  barStyle,
  wrapWidth,
  position = 'normal',
  unfilled = true,
  appearTransition = false
}: ProgressBarProps) {
  r(COMPONENT)

  const [layoutWidth, setLayoutWidth] = useState(wrapWidth || 0)
  const widthSource = wrapWidth || layoutWidth || Dimensions.get('window').width
  const targetWidth = getWidth(widthSource, percent)

  // appearTransition: 进入时从 0 动画到目标宽度
  const progressWidth = useSharedValue(targetWidth)
  useEffect(() => {
    if (appearTransition) {
      progressWidth.value = withTiming(targetWidth, { duration: 1000 })
    } else {
      progressWidth.value = targetWidth
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appearTransition, targetWidth])

  const animatedStyle = useAnimatedStyle(() => ({
    width: progressWidth.value
  }))

  const onLayout = (e: any) => {
    const width = e.nativeEvent.layout.width
    if (!wrapWidth) setLayoutWidth(width)
  }

  return (
    <View
      style={[
        styles.progressOuter,
        position === 'fixed' && { position: 'absolute', top: 0 },
        !unfilled && { backgroundColor: 'transparent' },
        style
      ]}
      onLayout={onLayout}
    >
      {appearTransition ? (
        <Animated.View style={[styles.progressBar, animatedStyle, barStyle]} />
      ) : (
        <View style={[styles.progressBar, { width: targetWidth, height: 0 }, barStyle]} />
      )}
    </View>
  )
}

export default observer(ProgressBar)