/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-28 17:25:36
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconTouchable({ style, name, size, color, onPress }) {
  return (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont name={name} size={size} color={color} />
    </Touchable>
  )
}

IconTouchable.defaultProps = {
  size: 16
}

export default IconTouchable

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
