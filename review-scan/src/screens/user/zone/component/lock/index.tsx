/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:04:07
 */
import React from 'react'
import { Flex, Mesume, Text } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Lock() {
  const { $ } = useStore<Ctx>()
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

export default ob(Lock, COMPONENT)
