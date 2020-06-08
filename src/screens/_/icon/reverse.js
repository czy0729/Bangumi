/*
 * @Author: czy0729
 * @Date: 2019-05-13 20:33:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:14:46
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconReverse({ style, color, onPress }) {
  return (
    <Touchable style={[styles.container, style]} onPress={onPress}>
      <Iconfont name='sort' size={16} color={color} />
    </Touchable>
  )
}

export default IconReverse

const styles = StyleSheet.create({
  container: {
    padding: _.sm
  }
})
