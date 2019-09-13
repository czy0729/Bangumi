/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-09 14:54:56
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex, Text } from '@components'
import _ from '@styles'

function SectionHeader({ style, size, right, children }) {
  return (
    <Flex style={[styles.section, style]}>
      <Flex.Item>
        <Text type='sub' size={size}>
          {children}
        </Text>
      </Flex.Item>
      {right}
    </Flex>
  )
}

SectionHeader.defaultProps = {
  size: 12
}

export default SectionHeader

const styles = StyleSheet.create({
  section: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  }
})
