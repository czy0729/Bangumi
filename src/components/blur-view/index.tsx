/*
 *
 * @Doc: https://docs.expo.io/versions/latest/sdk/blur-view/
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 02:55:03
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView as ExpoBlurView } from 'expo-blur'
import { matchCoverUrl } from '@utils'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { Component } from '../component'
import { Image } from '../image'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT, COMPONENT } from './ds'
import { styles } from './styles'
import { Props as BlurViewProps } from './types'

export { BlurViewProps, BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK }

/**
 * 图片毛玻璃化，非毛玻璃容器
 * @doc https://docs.expo.io/versions/latest/sdk/blur-view
 * */
export const BlurView = observer(
  ({
    style,
    src,
    /** @ts-ignore */
    tint = BLURVIEW_TINT_LIGHT,
    intensity = 100,
    blurRadius = 16,
    cdn = true,
    children
  }: BlurViewProps) => {
    r(COMPONENT)

    if (!src) return null

    const _src = cdn ? matchCoverUrl(src) : src
    if (IOS) {
      return (
        <Component id='component-blur-view' style={style}>
          <Image imageStyle={styles.image} src={_src} fadeDuration={0} textOnly={false} />
          <ExpoBlurView style={StyleSheet.absoluteFill} tint={tint} intensity={intensity} />
          {children}
        </Component>
      )
    }

    return (
      <Component id='component-blur-view' style={style}>
        <Image
          imageStyle={styles.image}
          src={_src}
          fadeDuration={0}
          blurRadius={blurRadius}
          textOnly={false}
          fallback
        />
        <View style={styles.mask} />
        {children}
      </Component>
    )
  }
)

export default BlurView
