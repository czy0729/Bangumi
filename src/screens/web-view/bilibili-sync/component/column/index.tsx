/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 18:05:52
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'
import { Props } from './types'

function Column({ style, type, text, right, onPress }: Props) {
  return (
    <Flex style={style}>
      <Text size={11} type={!text || text === '/' ? 'sub' : type} onPress={onPress}>
        {text || '__'}
      </Text>
      {right}
    </Flex>
  )
}

export default ob(Column, COMPONENT)
