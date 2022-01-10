/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 14:15:16
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { matchCoverUrl } from '@utils/app'
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

    const _src = matchCoverUrl(src)
    if (IOS) {
      return (
        <View style={style}>
          <Image
            imageStyle={styles.image}
            src={_src}
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
        <Image
          imageStyle={styles.image}
          src={_src}
          fadeDuration={0}
          blurRadius={16}
          textOnly={false}
          fallback
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
