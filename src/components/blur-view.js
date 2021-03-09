/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 10:54:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
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
  ({
    style,
    src,
    theme = 'default',
    tint = 'default',
    intensity = 100,
    children
  }) => {
    if (!src) {
      return null
    }

    return (
      <View style={style}>
        {src && (
          <Image
            imageStyle={styles.image}
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
              style={StyleSheet.absoluteFill}
              colors={backgroundColor[theme]}
            />
          )
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
