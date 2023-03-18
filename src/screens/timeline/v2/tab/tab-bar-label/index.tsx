/*
 * @Author: czy0729
 * @Date: 2023-03-18 16:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 16:30:41
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { _ } from '@stores'

function TabBarLabel({ route, focused }) {
  return (
    <Flex style={_.container.block} justify='center'>
      <Text type='title' size={13} bold={focused}>
        {route.title}
      </Text>
    </Flex>
  )
}

export default ob(TabBarLabel)
