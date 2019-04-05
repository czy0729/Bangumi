/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:38:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-05 11:01:34
 */
import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { LinearGradient } from 'expo'

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
  dark: ['rgba(0, 0, 0, 0.24)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.24)'],
  xdark: ['rgba(0, 0, 0, 0.32)', 'rgba(0, 0, 0, 0.32)'],
  light: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  xlight: ['rgba(255, 255, 255, 0.88)', 'rgba(255, 255, 255, 0.88)'],
  a: ['rgba(255, 255, 255, 0.64)', 'rgba(244, 244, 244, 1)', 'rgba(255, 255, 255, 1)']
}

const BlurView = ({ style, src, theme, children }) => (
  <View style={style}>
    {src && (
      <Image source={{ uri: src }} blurRadius={40} style={styles.container} />
    )}
    <LinearGradient
      colors={backgroundColor[theme]}
      style={[styles.container]}
    />
    {children}
  </View>
)

BlurView.defaultProps = {
  theme: 'dark',
  src: undefined
}

export default BlurView
