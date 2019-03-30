/*
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-29 04:10:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { colorBorder } from '@styles'

const Divider = ({ style }) => (
  <View style={[styles.divider, style]}>
    <View style={styles.line} />
  </View>
)

export default Divider

const styles = StyleSheet.create({
  divider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16
  },
  line: {
    width: 48,
    borderWidth: 1,
    borderColor: colorBorder
  }
})
