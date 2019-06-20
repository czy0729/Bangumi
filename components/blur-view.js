/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-19 21:24:19
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
// import { BlurView as ExpoBlurView } from 'expo-blur'
import { BlurView as ExpoBlurView, LinearGradient } from 'expo'
import { IOS } from '@constants'
import Image from './image'

const backgroundColor = {
  dark: ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)'],
  xdark: ['rgba(0, 0, 0, 0.32)', 'rgba(0, 0, 0, 0.32)'],
  light: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  xlight: ['rgba(255, 255, 255, 0.64)', 'rgba(255, 255, 255, 0.8)']
}

const BlurView = ({ style, src, theme, intensity, children }) => {
  if (!src) {
    return null
  }

  return (
    <View style={style}>
      {src && (
        <Image
          imageStyle={{
            ...StyleSheet.absoluteFill,
            width: 'auto',
            height: 'auto'
          }}
          src={src}
          blurRadius={IOS ? undefined : 40}
        />
      )}
      {IOS ? (
        <ExpoBlurView
          style={StyleSheet.absoluteFill}
          tint='default'
          intensity={intensity}
        />
      ) : (
        <LinearGradient
          colors={backgroundColor[theme]}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  )
}

BlurView.defaultProps = {
  style: undefined,
  theme: 'default',
  src: undefined,
  intensity: 100,
  children: undefined
}

export default BlurView
