/*
 * @Author: czy0729
 * @Date: 2019-05-24 04:34:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-07 16:57:49
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import _ from '@styles'

function IconHeader({ style, size, name, color, onPress }) {
  return (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont size={size} name={name} color={color} />
    </Touchable>
  )
}

IconHeader.defaultProps = {
  size: 20,
  color: _.colorTitle
}

export default IconHeader

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
