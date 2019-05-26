/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-26 02:31:48
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import _ from '@styles'

const IconHeader = ({ style, size, name, color, onPress }) => (
  <Touchable style={[styles.icon, style]} onPress={onPress}>
    <Iconfont size={size} name={name} color={color} />
  </Touchable>
)

IconHeader.defaultProps = {
  size: 22,
  color: _.colorTitle
}

export default IconHeader

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
