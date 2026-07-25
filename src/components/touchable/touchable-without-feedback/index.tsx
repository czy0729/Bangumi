/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:14:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 00:24:54
 */
import React from 'react'
import { TouchableWithoutFeedback as RNTouchableWithoutFeedback, View } from 'react-native'

import type { Props } from './types'

function TouchableWithoutFeedback({ style, useRN, children, ...other }: Props) {
  return (
    <RNTouchableWithoutFeedback {...other}>
      <View style={style}>{children}</View>
    </RNTouchableWithoutFeedback>
  )
}

export default React.memo(TouchableWithoutFeedback)
