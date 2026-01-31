/*
 * @Author: czy0729
 * @Date: 2023-03-18 16:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 14:54:09
 */
import React from 'react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TabBarLabel({ route, focused }) {
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
