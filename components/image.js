/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:17:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 06:37:53
 */
import React from 'react'
import {
  Platform,
  StyleSheet,
  Image,
  View,
  TouchableHighlight
} from 'react-native'
import { colorBg, radiusXs } from '@styles'

const _Image = ({
  style,
  src,
  size,
  height,
  border,
  radius,
  shadow,
  onPress,
  ...other
}) => {
  const _style = [styles.image]
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
  }
  if (shadow) {
    const highlightStyle = [styles.highlight]
    if (radius) {
      highlightStyle.push(styles.radius)
    }
    return (
      <View style={styles.shadow}>
        {onPress && (
          <TouchableHighlight
            style={highlightStyle}
            underlayColor='rgba(0, 0, 0, 0.24)'
            onPress={onPress}
          >
            <View />
          </TouchableHighlight>
        )}
        <Image style={_style} source={{ uri: src }} {...other} />
      </View>
    )
  }
  return <Image style={_style} source={{ uri: src }} {...other} />
}

_Image.defaultProps = {
  src: undefined,
  size: 40,
  height: undefined,
  border: false,
  radius: false,
  shadow: false
}

export default _Image

const styles = StyleSheet.create({
  image: {
    backgroundColor: colorBg
  },
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
      shadowOffset: { height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: radiusXs
    },
    android: {
      elevation: 8
    }
  }),
  highlight: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
