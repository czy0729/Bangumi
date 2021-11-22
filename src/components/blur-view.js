/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-23 06:57:57
 */
import React from 'react'
import { StyleSheet, View, Image as RNImage } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
// import { BlurView as RNBlurView } from '@react-native-community/blur'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { IOS } from '@constants'
import { Image } from './image'

const backgroundColor = {
  dark: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.12)', 'rgba(0, 0, 0, 0.24)'],
  xdark: ['rgba(0, 0, 0, 0.32)', 'rgba(0, 0, 0, 0.32)'],
  light: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  xlight: ['rgba(255, 255, 255, 0.64)', 'rgba(255, 255, 255, 0.8)']
}

export const BlurView = observer(
  ({ style, src, theme = 'light', tint = 'light', intensity = 100, children }) => {
    if (!src) return null

    if (IOS) {
      return (
        <View style={style}>
          <Image
            imageStyle={styles.image}
            src={src}
            fadeDuration={0}
            textOnly={false}
          />
          <ExpoBlurView
            style={StyleSheet.absoluteFill}
            tint={tint}
            intensity={intensity}
          />
          {children}
        </View>
      )
    }

    return (
      <View style={style}>
        <RNImage
          style={styles.image}
          source={{
            uri: src.replace('http://', 'https://')
          }}
          fadeDuration={0}
          blurRadius={16}
          textOnly={false}
        />
        {!!theme && (
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={backgroundColor[theme]}
          />
        )}
        {children}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFill,
    width: 'auto',
    height: 'auto'
  }
})
