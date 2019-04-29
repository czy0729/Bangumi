/*
 * @Author: czy0729
 * @Date: 2019-04-18 16:34:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-27 01:18:02
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex, Text } from '@components'
import { wind, sm } from '@styles'

const SectionHeader = ({ style, size, right, children }) => (
  <Flex style={[styles.section, style]}>
    <Flex.Item>
      <Text type='sub' size={size}>
        {children}
      </Text>
    </Flex.Item>
    {right}
  </Flex>
)

SectionHeader.defaultProps = {
  size: 12
}

export default SectionHeader

const styles = StyleSheet.create({
  section: {
    paddingVertical: sm,
    paddingHorizontal: wind
  }
})
