/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 02:55:10
 */
import React from 'react'
import { Flex, Text } from '@components'

const SectionTitle = ({ style, right, children }) => (
  <Flex style={style}>
    <Flex.Item>
      <Text type='title' size={20} bold>
        {children}
      </Text>
    </Flex.Item>
    {right}
  </Flex>
)

export default SectionTitle
