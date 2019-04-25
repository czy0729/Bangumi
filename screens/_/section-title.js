/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-23 17:01:20
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Flex, Text } from '@components'
import _, { colorMain } from '@styles'

const SectionTitle = ({ style, children }) => (
  <Flex style={style}>
    <View style={styles.line} />
    <Text style={_.ml.sm} size={16}>
      {children}
    </Text>
  </Flex>
)

export default SectionTitle

const styles = StyleSheet.create({
  line: {
    height: '100%',
    borderLeftWidth: 3,
    borderLeftColor: colorMain,
    borderRadius: 6
  }
})
