/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:34:22
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { PropsWithChildren } from 'react'

function ContainerContent({ children }: PropsWithChildren) {
  r(COMPONENT)

  return (
    <Flex style={systemStore.setting.homeListCompact ? styles.compact : styles.content}>
      {children}
    </Flex>
  )
}

export default observer(ContainerContent)
