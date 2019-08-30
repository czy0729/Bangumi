/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-30 18:09:18
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import _ from '@styles'
import Flex from './flex'
import Text from './text'

function Divider({ style }) {
  return (
    <Flex style={[styles.divider, style]}>
      <View style={styles.line} />
      <Text style={styles.text} type='border' size={20}>
        / / /
      </Text>
      <View style={styles.line} />
    </Flex>
  )
}

Divider.defaultProps = {
  style: undefined
}

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
    marginHorizontal: _.wind
  },
  line: {
    width: 80,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: _.colorBorder
  }
})
