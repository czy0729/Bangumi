/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:13:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-07 11:12:38
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import Text from '../text'

function HiddenText({ style, children, ...other }) {
  return (
    <Text style={[style, styles.hidden]} selectable {...other}>
      {children}
    </Text>
  )
}

export default HiddenText

const styles = StyleSheet.create({
  hidden: {
    opacity: 0
  }
})
