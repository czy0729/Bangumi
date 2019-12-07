/*
 * @Author: czy0729
 * @Date: 2019-07-28 01:24:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:15:18
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconTouchable({ style, name, color, onPress }) {
  return (
    <Touchable style={[styles.icon, style]} onPress={onPress}>
      <Iconfont name={name} size={16} color={color} />
    </Touchable>
  )
}

export default IconTouchable

const styles = StyleSheet.create({
  icon: {
    padding: _.sm
  }
})
