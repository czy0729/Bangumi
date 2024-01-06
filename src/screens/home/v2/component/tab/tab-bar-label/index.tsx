/*
 * @Author: czy0729
 * @Date: 2023-03-26 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-26 04:25:10
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function TabBarLabel({ focused, route }) {
  return (
    <Flex style={_.container.block} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  )
}

export default ob(TabBarLabel, COMPONENT)
