/*
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-02 19:49:54
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { wind, colorBorder } from '@styles'
import Flex from './flex'
import Text from './text'

const Divider = ({ style }) => (
  <Flex style={[styles.divider, style]}>
    <View style={styles.line} />
    <Text style={styles.text} type='border' size={20}>
      / / /
    </Text>
    <View style={styles.line} />
  </Flex>
)

export default Divider

const styles = StyleSheet.create({
  divider: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 32
  },
  text: {
    marginHorizontal: wind
  },
  line: {
    width: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colorBorder
  }
})
