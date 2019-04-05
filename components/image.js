/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-06 04:51:11
 */
import React from 'react'
import {
  Platform,
  StyleSheet,
  Image,
  View,
  TouchableHighlight
} from 'react-native'
import { colorPlain, radiusXs } from '@styles'

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
  const _style = []
  const highlightStyle = [styles.highlight]
  if (size) {
    _style.push({
      width: size,
      height: height || size
    })
  }
  if (border) {
    _style.push(styles.border)
  }
  if (radius) {
    _style.push(styles.radius)
    highlightStyle.push(styles.radius)
  }
  if (placeholder) {
    _style.push(styles.placeholder)
  }
  return (
    <View style={shadow ? styles.shadow : undefined}>
      {onPress && (
        <TouchableHighlight
          style={highlightStyle}
          underlayColor='rgba(0, 0, 0, 0.24)'
          onPress={onPress}
          onLongPress={onLongPress}
        >
          <View />
        </TouchableHighlight>
      )}
      <Image style={_style} source={source} {...other} />
    </View>
  )
}

_Image.defaultProps = {
  src: undefined,
  size: 40,
  height: undefined,
  border: false,
  radius: false,
  shadow: false,
  placeholder: true
}

export default _Image

const styles = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)'
  },
  radius: {
    borderRadius: radiusXs
  },
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: radiusXs
    },
    android: {
      elevation: 8
    }
  }),
  placeholder: {
    backgroundColor: colorPlain
  },
  highlight: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
