/*
 * @Author: czy0729
 * @Date: 2023-03-26 03:37:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:40:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

function TabBarLabel({ focused, route }) {
  r(COMPONENT)

  return (
    <Flex style={styles.label} justify='center'>
      <Text type='title' size={13} bold={focused} noWrap>
        {route.title}
      </Text>
    </Flex>
  )
}

export default observer(TabBarLabel)
