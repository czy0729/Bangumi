/*
 * @Author: czy0729
 * @Date: 2020-04-12 03:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-12 05:10:55
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { _ } from '@stores'

function MaxWidth({ children }) {
  if (!_.isPad) {
    return children
  }

  return <View style={styles.maxWidth}>{children}</View>
}

export default MaxWidth

const styles = StyleSheet.create({
  maxWidth: {
    width: _.window.width,
    paddingHorizontal: (_.window.width - _.window.maxWidth) / 2
  }
})
