/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:31:52
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { matchCoverUrl } from '@utils/app'
import { IOS } from '@constants'
import { Image } from '../image'
import { styles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps }

export const BlurView = observer(
  ({
    style,
    src,
    tint = 'light',
    intensity = 100,
    blurRadius = 16,
    children
  }: BlurViewProps) => {
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
          fadeDuration={80}
          blurRadius={blurRadius}
          textOnly={false}
          fallback
        />
        {children}
      </View>
    )
  }
)
