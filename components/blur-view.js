/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 01:04:30
 */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { LinearGradient } from 'expo'

const backgroundColor = {
  dark: ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)'],
  xdark: ['rgba(0, 0, 0, 0.32)', 'rgba(0, 0, 0, 0.32)'],
  light: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  xlight: ['rgba(255, 255, 255, 0.88)', 'rgba(255, 255, 255, 0.88)']
}

const BlurView = ({ style, src, theme, children }) => (
  <View style={style}>
    {src && (
      <Image
        source={{ uri: src }}
        blurRadius={40}
        style={StyleSheet.absoluteFill}
      />
    )}
    <LinearGradient
      colors={backgroundColor[theme]}
      style={StyleSheet.absoluteFill}
    />
    {children}
  </View>
)

BlurView.defaultProps = {
  style: undefined,
  theme: 'dark',
  src: undefined,
  children: undefined
}

export default BlurView
