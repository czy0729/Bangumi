/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-02 22:43:49
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function IconBack({ style, navigation, color }) {
  return (
    <Touchable style={[styles.container, style]} onPress={navigation.goBack}>
      <Iconfont name='left' size={20} color={color} />
    </Touchable>
  )
}

IconBack.defaultProps = {
  color: _.colorPlain
}

export default IconBack

const styles = StyleSheet.create({
  container: {
    padding: _.sm
  }
})
