/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:21:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 16:36:58
 */
import React from 'react'
import {
  View,
  TouchableNativeFeedback as RNTouchableNativeFeedback
} from 'react-native'
import { TouchableNativeFeedback as GHTouchableNativeFeedback } from 'react-native-gesture-handler'
import { separateStyles, styles } from './utils'

function TouchableNativeFeedback({ style, useRN, delayPressIn, children, ...other }) {
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
      <GHTouchableNativeFeedback
        style={_styles.style}
        delayPressIn={delayPressIn}
        {...other}
      >
        <View>{children}</View>
      </GHTouchableNativeFeedback>
    </View>
  )
}

export default TouchableNativeFeedback
