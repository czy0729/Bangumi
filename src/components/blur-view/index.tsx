/*
 * 毛玻璃
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 23:08:23
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView, BlurProps } from 'expo-blur'
import { matchCoverUrl } from '@utils/app'
import { IOS } from '@constants'
import { Expand, ReactNode, ViewStyle } from '@types'
import { Image } from '../image'
import { styles } from './styles'

type Props = Expand<
  BlurProps & {
    style?: ViewStyle
    src?: string
    children?: ReactNode
  }
>

export const BlurView = observer(
  ({ style, src, tint = 'light', intensity = 100, children }: Props) => {
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
          blurRadius={16}
          textOnly={false}
          fallback
        />
        {children}
      </View>
    )
  }
)
