/*
 * @Author: czy0729
 * @Date: 2023-03-26 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:55:12
 */
import React from 'react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TabBarLabel({ focused, route }) {
  r(COMPONENT)

  return useObserver(() => (
    <Flex style={styles.label} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  ))
}

export default TabBarLabel
