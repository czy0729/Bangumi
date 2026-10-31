/*
 * @Author: czy0729
 * @Date: 2023-03-18 16:27:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * TabBar 标签
 */
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function TabBarLabel({ route, focused }: Props) {
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
