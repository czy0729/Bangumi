/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-26 02:22:57
 */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
})
const backgroundColor = {
  dark: 'rgba(0, 0, 0, 0.16)',
  xdark: 'rgba(0, 0, 0, 0.32)',
  light: 'rgba(255, 255, 255, 0.16)',
  xlight: 'rgba(255, 255, 255, 0.88)'
}

const BlurView = ({ style, src, theme, children }) => (
  <View style={style}>
    {src && (
      <Image source={{ uri: src }} blurRadius={20} style={styles.container} />
    )}
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor[theme]
        }
      ]}
    />
    {children}
  </View>
)

BlurView.defaultProps = {
  theme: 'dark',
  src: undefined
}

export default BlurView
