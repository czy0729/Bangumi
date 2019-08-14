/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 10:28:11
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import _ from '@styles'

function Li({ style, children, ...other }) {
  return (
    <View style={[style, styles.li]} {...other}>
      {children}
    </View>
  )
}

export default Li

const styles = StyleSheet.create({
  li: {
    paddingVertical: _.sm,
    borderBottomWidth: 1,
    borderBottomColor: _.colorBg
  }
})
