/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:11:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-20 12:46:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { Image } from '../../image'
import { memoStyles } from './styles'

function Disc({
  imageStyle,
  angleStyle,
  src,
  imageViewerSrc,
  textOnly,
  fallback,
  size,
  width,
  height,
  radius,
  ...other
}) {
  const styles = memoStyles()
  const { coverRadius } = systemStore.setting

  // 音乐为矩形唱片装, 长宽取短的
  const w = Math.min(size || 1000, width || 1000, height || 1000) - 8
  const _style = {
    width: w,
    height: w,
    borderRadius: radius === true ? coverRadius : radius || _.radiusXs
  }
  return (
    <View style={_style}>
      <View
        style={stl([
          styles.disc,
          _style,
          {
            borderRadius: w / 2
          },
          angleStyle
        ])}
      />
      <View style={[styles.mask, _style]} />
      <Image
        style={[imageStyle, styles.image]}
        src={src}
        imageViewerSrc={imageViewerSrc}
        border
        textOnly={textOnly}
        fallback={fallback}
        radius={_style.borderRadius}
        {...other}
        size={w}
        width={w}
        height={w}
      />
    </View>
  )
}

export default observer(Disc)
