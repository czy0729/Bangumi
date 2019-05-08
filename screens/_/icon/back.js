/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-08 20:41:03
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { sm, colorPlain } from '@styles'

const IconBack = ({ style, color, navigation }) => (
  <Touchable
    style={[styles.container, style]}
    onPress={() => navigation.goBack()}
  >
    <Iconfont name='left' size={24} color={color} />
  </Touchable>
)

IconBack.defaultProps = {
  color: colorPlain
}

export default IconBack

const styles = StyleSheet.create({
  container: {
    padding: sm
  }
})
