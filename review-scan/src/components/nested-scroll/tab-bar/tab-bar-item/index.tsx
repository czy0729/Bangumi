/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:22:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:22:40
 */
import React from 'react'
import { Pressable } from 'react-native'
import { stl } from '@utils'
import { Text } from '../../../text'
import { styles } from './styles'
import { Props } from './types'

export function TabBarItem({ title, style, labelStyle, renderLabel, onPress, onLayout }: Props) {
  return (
    <Pressable style={stl(styles.tab, style)} onPress={onPress} onLayout={onLayout}>
      {typeof renderLabel === 'function' ? (
        renderLabel({
          style: labelStyle || {},
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
