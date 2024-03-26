/*
 * @Author: czy0729
 * @Date: 2024-01-20 08:46:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 04:55:29
 */
import React, { PropsWithChildren } from 'react'
import { Flex } from '@components'
import { systemStore } from '@stores'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { styles } from './styles'

function ContainerContent({ children }: PropsWithChildren<{}>) {
  return (
    <Flex style={systemStore.setting.homeListCompact ? styles.compact : styles.content}>
      {children}
    </Flex>
  )
}

export default ob(ContainerContent, COMPONENT)
