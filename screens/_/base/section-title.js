/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-04 02:22:57
 */
import React from 'react'
import { Flex, Text } from '@components'

function SectionTitle({ style, right, children }) {
  return (
    <Flex style={style}>
      <Flex.Item>
        <Text type='title' size={20} bold>
          {children}
        </Text>
      </Flex.Item>
      {right}
    </Flex>
  )
}

export default SectionTitle
