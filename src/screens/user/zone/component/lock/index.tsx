/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:41:39
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, Mesume, Text } from '@components'
import { useStore } from '@stores'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Lock() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { ban } = $.users
  if (!ban) return null

  const styles = memoStyles()

  return (
    <Flex style={styles.container}>
      <Mesume index={2} size={60} />
      <Flex.Item>
        <Text bold>{ban}</Text>
      </Flex.Item>
    </Flex>
  )
}

export default observer(Lock)
