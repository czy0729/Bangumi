/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:22:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:05:55
 */
import React from 'react'
import { Pressable } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Text } from '../../../text'
import { styles } from './styles'

import type { Props } from './types'
import type { ViewStyle } from '@types'

function TabBarItem({ title, style, labelStyle, renderLabel, onPress, onLayout }: Props) {
  return (
    <Pressable style={stl(styles.tab, style)} onPress={onPress} onLayout={onLayout}>
      {typeof renderLabel === 'function' ? (
        renderLabel({
          style: (labelStyle || {}) as ViewStyle,
          title
        })
      ) : (
        <Text style={labelStyle} size={14} type='desc'>
          {title}
        </Text>
      )}
    </Pressable>
  )
}

export default observer(TabBarItem)
