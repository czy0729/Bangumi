/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:21:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:15:41
 */
import React from 'react'
import { TouchableNativeFeedback as RNTouchableNativeFeedback, View } from 'react-native'
import { TouchableNativeFeedback as GHTouchableNativeFeedback } from 'react-native-gesture-handler'
import { separateStyles, styles } from '../utils'

import type { TouchableNativeFeedbackProps } from './types'

function TouchableNativeFeedback({
  style,
  useRN,
  delayPressIn,
  children,
  ...other
}: TouchableNativeFeedbackProps) {
  // TouchableNativeFeedback 当 delayPressIn=0 时在安卓端触摸太快会触发涟漪, 需要延迟
  if (delayPressIn !== 0) delayPressIn = 80

  if (useRN) {
    return (
      <View style={style}>
        <RNTouchableNativeFeedback delayPressIn={delayPressIn} {...other}>
          <View style={styles.touchable} />
        </RNTouchableNativeFeedback>
        {children}
      </View>
    )
  }

  const _styles = separateStyles(style)
  return (
    <View style={_styles.containerStyle}>
      <GHTouchableNativeFeedback style={_styles.style} delayPressIn={delayPressIn} {...other}>
        <View>{children}</View>
      </GHTouchableNativeFeedback>
    </View>
  )
}

export default TouchableNativeFeedback
