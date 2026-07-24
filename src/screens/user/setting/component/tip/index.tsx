/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:17:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:15:07
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { PropsWithChildren } from 'react'

function Tip({ children }: PropsWithChildren<{}>) {
  r(COMPONENT)

  return (
    <Flex style={styles.tip}>
      <Flex.Item>
        <Text type='sub' bold>
          {children}
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Tip)
