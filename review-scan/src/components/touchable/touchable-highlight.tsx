/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:40:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-28 16:43:56
 */
import React from 'react'
import { View, TouchableHighlight as RNTouchableHighlight } from 'react-native'
import { TouchableHighlight as GHTouchableHighlight } from 'react-native-gesture-handler'
import { _ } from '@stores'
import { styles } from './utils'

function TouchableHighlight({ style, useRN, children, ...other }) {
  if (useRN) {
    return (
      <View style={style}>
        <RNTouchableHighlight
          style={styles.touchable}
          activeOpacity={1}
          underlayColor={_.colorHighLight}
          {...other}
        >
          <View />
        </RNTouchableHighlight>
        {children}
      </View>
    )
  }

  return (
    <GHTouchableHighlight
      style={style}
      activeOpacity={1}
      underlayColor={_.colorHighLight}
      {...other}
    >
      <View>{children}</View>
    </GHTouchableHighlight>
  )
}

export default TouchableHighlight
