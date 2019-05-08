/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 21:36:15
 */
import React from 'react'
import { Flex, Text } from '@components'

const SectionTitle = ({ style, children }) => (
  <Flex style={style}>
    <Text type='title' size={20} bold>
      {children}
    </Text>
  </Flex>
)

export default SectionTitle
