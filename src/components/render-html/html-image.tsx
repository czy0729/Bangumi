/*
 * @Author: czy0729
 * @Date: 2026-11-23 05:33:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 10:40:00
 *
 * vendor 自 react-native-render-html@4.1.1/src (上游已停更)
 * 原 patches/react-native-render-html+4.1.1.patch 的差异 (style 校验) 由 TS 类型取代
 * 本地差异: StyleSheet.flatten 取尺寸, 尺寸逻辑移入 html-image-hooks
 */
import { Image, Text, View } from 'react-native'
import { useImageSize } from './html-image-hooks'

import type { ImageStyle, StyleProp } from 'react-native'

export interface HTMLImageProps {
  source: { uri: string }
  alt?: string
  height?: number | string
  width?: number | string
  style?: StyleProp<ImageStyle>
  imagesMaxWidth?: number
  imagesInitialDimensions?: { width: number; height: number }
}

export default function HTMLImage(props: HTMLImageProps) {
  const { source, alt, style } = props
  const { width, height, error } = useImageSize(props)

  if (error) {
    return (
      <View
        style={{
          width: 50,
          height: 50,
          borderWidth: 1,
          borderColor: 'lightgray',
          overflow: 'hidden',
          justifyContent: 'center'
        }}
      >
        {alt ? <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>{alt}</Text> : false}
      </View>
    )
  }

  return (
    <Image source={source} style={[style, { width, height, resizeMode: 'cover' } as ImageStyle]} />
  )
}
