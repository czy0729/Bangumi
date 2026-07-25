/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:40:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:15:46
 */
import React from 'react'
import { TouchableHighlight as RNTouchableHighlight, View } from 'react-native'
import { TouchableHighlight as GHTouchableHighlight } from 'react-native-gesture-handler'
import { _ } from '@stores'
import { styles } from '../utils'

import type { TouchableHighlightProps } from './types'

function TouchableHighlight({ style, useRN, children, ...other }: TouchableHighlightProps) {
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
    // @ts-expect-error gesture handler 的 TouchableHighlightProps 中 onLongPress 类型定义存在冲突
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
