/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:24:28
 */
import React from 'react'
import { Flex } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { PropsWithChildren } from 'react'

function ContainerContent({ children }: PropsWithChildren) {
  r(COMPONENT)

  return useObserver(() => (
    <Flex style={systemStore.setting.homeListCompact ? styles.compact : styles.content}>
      {children}
    </Flex>
  ))
}

export default ContainerContent
