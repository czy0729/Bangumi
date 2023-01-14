/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:44:13
 */
import React from 'react'
import { Flex, Mesume, Text } from '@components'
import { obc } from '@utils/decorators'
import { memoStyles } from './styles'

function Lock({ text }) {
  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <Mesume index={2} size={64} />
      <Flex.Item>
        <Text bold>{text}</Text>
      </Flex.Item>
    </Flex>
  )
}

export default obc(Lock)
