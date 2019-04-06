/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-07 03:27:26
 */
import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { IOS } from '@constants'
import { colorBg, radiusXs, shadow } from '@styles'
import Touchable from './touchable'

const _Image = ({
  style,
  src,
  size,
  height,
  border,
  radius,
  shadow,
  placeholder,
  onPress,
  onLongPress,
  ...other
}) => {
  const source = typeof src === 'string' ? { uri: src } : src
  const _wrap = []
  const _image = []
  if (size) {
    _image.push({
      width: size,
      height: height || size
    })
  }
  if (border) {
    _image.push(styles.border)
  }
  if (radius) {
    _wrap.push(styles.radius)
    _image.push(styles.radius)
  }
  if (shadow) {
    _wrap.push(styles.shadow)
  }
  if (placeholder) {
    _wrap.push(styles.placeholder)
  }
  if (style) {
    _wrap.push(style)
  }
  if (onPress || onLongPress) {
    return (
      <Touchable
        style={_wrap}
        highlight={IOS}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        <Image style={_image} source={source} {...other} />
      </Touchable>
    )
  }

  return (
    <View style={_wrap}>
      <Image style={_image} source={source} {...other} />
    </View>
  )
}

_Image.defaultProps = {
  style: undefined,
  src: undefined,
  size: 40,
  height: undefined,
  border: false,
  radius: false,
  shadow: false,
  placeholder: true,
  onPress: undefined,
  onLongPress: undefined
}

export default _Image

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)'
  },
  radius: {
    borderRadius: radiusXs,
    overflow: 'hidden'
  },
  shadow,
  placeholder: {
    backgroundColor: colorBg
  }
})
