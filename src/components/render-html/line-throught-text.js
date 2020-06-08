/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:07:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-14 10:35:11
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import Text from '../text'

function LineThroughtText({ style, children, ...other }) {
  return (
    <Text style={[style, styles.lineThrought]} {...other}>
      {children}
    </Text>
  )
}

export default LineThroughtText

const styles = StyleSheet.create({
  lineThrought: {
    textDecorationLine: 'line-through'
  }
})
