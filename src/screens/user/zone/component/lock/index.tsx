/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 08:48:23
 */
import React from 'react'
import { Flex, Mesume, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Lock(props, { $ }: Ctx) {
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

export default obc(Lock, COMPONENT)
