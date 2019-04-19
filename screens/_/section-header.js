/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-18 16:49:29
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@components'
import { wind, sm } from '@styles'

const SectionHeader = ({ style, children }) => (
  <View style={[styles.section, style]}>
    <Text type='sub' size={12}>
      {children}
    </Text>
  </View>
)

export default SectionHeader

const styles = StyleSheet.create({
  section: {
    paddingVertical: sm,
    paddingLeft: wind
  }
})
