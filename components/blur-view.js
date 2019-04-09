/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-09 14:58:02
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo'
import Image from './image'

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
        imageStyle={{
          ...StyleSheet.absoluteFill,
          width: 'auto',
          height: 'auto'
        }}
        src={src}
        blurRadius={40}
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
