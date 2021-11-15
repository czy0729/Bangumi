/*
 * @Author: czy0729
 * @Date: 2020-06-24 16:48:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:50:54
 */
import * as React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../text'

export const SegmentedControlTab = ({
  onSelect,
  value,
  enabled,
  selected,
  type = 'title',
  size = 14
}) => (
  <TouchableOpacity style={styles.container} disabled={!enabled} onPress={onSelect}>
    <View style={styles.default}>
      <Text type={type} size={size} bold={selected}>
        {value}
      </Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 5
  },
  default: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5
  },
  activeText: {
    fontWeight: 'bold'
  }
})
