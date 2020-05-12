/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-12 16:29:22
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { IOS } from '@constants'
import Image from './image'

const backgroundColor = {
  dark: ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)'],
  xdark: ['rgba(0, 0, 0, 0.32)', 'rgba(0, 0, 0, 0.32)'],
  light: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  xlight: ['rgba(255, 255, 255, 0.64)', 'rgba(255, 255, 255, 0.8)']
}

function BlurView({ style, src, theme, tint, intensity, children }) {
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
          fadeDuration={0}
          blurRadius={IOS ? undefined : 40}
        />
      )}
      {IOS ? (
        <ExpoBlurView
          style={StyleSheet.absoluteFill}
          tint={tint}
          intensity={intensity}
        />
      ) : (
        !!theme && (
          <LinearGradient
            colors={backgroundColor[theme]}
            style={StyleSheet.absoluteFill}
          />
        )
      )}
      {children}
    </View>
  )
}

BlurView.defaultProps = {
  style: undefined,
  theme: 'default',
  src: undefined,
  tint: 'default',
  intensity: 100
}

export default BlurView
