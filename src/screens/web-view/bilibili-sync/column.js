/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:03:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 09:21:30
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'

function Column({ style, type, text, right, onPress }) {
  return (
    <Flex style={style}>
      <Text size={11} type={!text ? 'sub' : type} onPress={onPress}>
        {text || '__'}
      </Text>
      {right}
    </Flex>
  )
}

export default ob(Column)
